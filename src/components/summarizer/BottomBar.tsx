"use client";

import { getText } from '@/actions';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { useError, useInput, useInputWordCountStore, useLoading, useOutputWordCountStore, useSentenceCount, useTextLength } from '@/store';
import { SignUpButton, useUser } from '@clerk/clerk-react';
import saveAs from "file-saver";
import { Copy, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '../ui/button';

const BottomBar = ({ }) => {

    const { user } = useUser();

    const { wordCount } = useInputWordCountStore();

    const { wordCount: outputWordCount } = useOutputWordCountStore();

    const { sentenceCount } = useSentenceCount();

    const { inputText, summarizedText, setSummarizedText } = useInput();

    const { textLength } = useTextLength();

    const { loading, setLoading } = useLoading();

    const { error, setError } = useError();

    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleSummarize = useCallback(async () => {
        try {
            setLoading(true);

            if (!inputText) {
                toast.error("Please enter some text to summarize");
                setLoading(false);
                return;
            }

            if (user && wordCount > 1200) {
                setLoading(false);
                return;
            } else {
                if (!user && wordCount > 300) {
                    setLoading(false);
                    return;
                }
            }

            const summary = await getText(inputText, textLength);

            setSummarizedText(summary as string);

        } catch (error) {
            console.log("Error summarizing text: ", error);
        } finally {
            setLoading(false);
        }
    }, [inputText, user, wordCount, textLength, setLoading, setSummarizedText]);

    const handleCopyText = async () => {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = summarizedText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success('Text copied to clipboard');
        } catch (error) {
            toast.error('Failed to copy text to clipboard');
        }
    };


    const handleExportText = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        const fileName = `Result_Data_${formattedDate}.doc`;
        const blob = new Blob([summarizedText], { type: 'application/msword' });

        saveAs(blob, fileName);
        toast.success('Text exported successfully');
    };


    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                handleSummarize();
            }
        };

        document.addEventListener("keydown", handleGlobalKeyDown);

        return () => {
            document.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [handleSummarize]);


    useEffect(() => {
        if (user && wordCount > 1200) {
            setError(true);
        } else {
            if (!user && wordCount > 300) {
                setError(true);
            } else {
                setError(false);
            }
        }
    }, [wordCount, user, setError]);



    return (
        <div className="h-16 border-t border-border">
            <div className="flex items-center justify-center w-full divide-x divide-border">
                <div className="flex items-center justify-between w-1/2 py-2 pl-4 pr-4">
                    <div className="items-center justify-start hidden md:flex gap-x-4">
                        <span className="text-sm font-medium md:text-base">
                            {wordCount} {wordCount === 1 ? "word" : "words"}
                        </span>
                        {error && (
                            <div className={cn(
                                "px-3 py-2 text-xs font-medium bg-red-100 border-red-300 rounded-sm dark:bg-red-200 dark:text-muted",
                                isMobile && "hidden"
                            )}>
                                {user ? (
                                    <span className="font-bold text-red-500">
                                        {wordCount} / 1200
                                    </span>
                                ) : (
                                    <span className="font-bold text-red-500">
                                        {wordCount} / 300
                                    </span>
                                )}
                                {" "}
                                Oops! For {user ? "1200" : "600"} word limit
                                {user ? (
                                    <Link href="/premium" className="text-blue-500 dark:text-blue-600 mx-0.5">
                                        Go Pro
                                    </Link>
                                ) : (
                                    <SignUpButton mode="modal">
                                        <span className="text-blue-500 dark:text-blue-600 cursor-pointer mx-0.5">
                                            Sign Up
                                        </span>
                                    </SignUpButton>
                                )}
                                {user ? "" : "for free"}
                            </div>
                        )}
                    </div>
                    <TooltipProvider>
                        <div className="hidden md:flex">
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        disabled={textLength < 20 || loading}
                                        onClick={handleSummarize}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 mx-7 animate-spin" />
                                        ) : summarizedText.length > 0 ? "Re-summarize" : "Summarize"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Summarize (Ctrl + Enter)
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="flex md:hidden">
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="xs"
                                        disabled={textLength < 20 || loading}
                                        onClick={handleSummarize}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 mx-7 animate-spin" />
                                        ) : summarizedText.length > 0 ? "Re-summarize" : "Summarize"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Summarize (Ctrl + Enter)
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
                <div className="flex items-center justify-end w-1/2 px-4 py-2 md:justify-between">
                    <div className="items-center hidden text-sm font-medium md:flex md:text-base">
                        {sentenceCount} sentences
                        <div className="w-1 h-1 mx-2 rounded-full bg-primary"></div>
                        {outputWordCount} words
                    </div>
                    {summarizedText.length > 0 && (
                        <div className="items-center hidden md:flex gap-x-4">
                            <TooltipProvider>
                                <div className="flex items-center">
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={handleExportText}>
                                                <Download className="w-5 h-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Export
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <div className="flex items-center">
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={handleCopyText}>
                                                <Copy className="w-5 h-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Copy text
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TooltipProvider>
                        </div>
                    )}
                    {summarizedText?.length > 0 && (
                        <div className="flex items-center md:hidden gap-x-4">
                            <Button variant="ghost" size="icon" onClick={handleExportText}>
                                <Download className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleCopyText}>
                                <Copy className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default BottomBar

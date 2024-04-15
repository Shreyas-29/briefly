"use client";

import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { useInputLang, useInputText, useIsLoading, useOutputLang, useOutputText, useTransInputWordCount, useTransOutputWordCount } from '@/store';
import axios from 'axios';
import saveAs from "file-saver";
import { Copy, Download, Loader2 } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

const Bottombar = () => {

    const { inputLang, setInputLang } = useInputLang();

    const { outputLang, setOutputLang } = useOutputLang();

    const { inputText } = useInputText();

    const { outputText, setOutputText } = useOutputText();

    const { loading, setLoading } = useIsLoading();

    const { wordCount: iWordCount, setWordCount: setIWordCount } = useTransInputWordCount();

    const { wordCount: oWordCount, setWordCount: setOWordCount } = useTransOutputWordCount();

    const handleTranslate = useCallback(async () => {
        try {

            setLoading(true);

            if (inputLang === outputLang) {
                toast.error("Input and Output languages cannot be same");
                return;
            }

            // const response = await fetch("https://libretranslate.de/translate", {
            //     method: "POST",
            //     body: JSON.stringify({
            //         q: inputText,
            //         source: inputLang,
            //         target: outputLang,
            //         format: "text"
            //     }),
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // });
            const response = await axios.post('https://api-inference.huggingface.co/models/t5-base', {
                inputs: inputText,
                options: {
                    task: 'translation',
                    source_lang: inputLang,
                    target_lang: outputLang,
                },
            }, {
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json',
                },
            });

            setOutputText(response.data[0]?.translation_text);

            toast.success('Translated Successfully');
        } catch (error) {
            console.error('Error translating text:', error);
            toast.error('Failed to translate text. Check console for details.');
        } finally {
            setLoading(false);
        }
    }, [inputLang, inputText, outputLang, setOutputText, setLoading]);

    const handleCopyText = async () => {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = outputText;
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
        const blob = new Blob([outputText], { type: 'application/msword' });

        saveAs(blob, fileName);
        toast.success('Text exported successfully');
    };

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                handleTranslate();
            }
        };

        document.addEventListener("keydown", handleGlobalKeyDown);

        return () => {
            document.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [handleTranslate]);



    return (
        <div className="h-16 border-t border-border">
            <div className="flex items-center justify-between w-full divide-x h-14 divide-border">
                <div className="flex items-center justify-between w-1/2 h-full py-2 pl-4 pr-4">
                    <span className="text-sm font-medium md:text-base">
                        {iWordCount} {iWordCount === 1 ? "word" : "words"}
                    </span>
                    <TooltipProvider>
                        <div className="hidden md:flex">
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        disabled={inputText.length < 0 || loading}
                                        onClick={handleTranslate}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 mx-5 animate-spin" />
                                        ) : "Translate"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Translate (Ctrl + Enter)
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="flex md:hidden">
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="xs"
                                        disabled={inputText.length < 0 || loading}
                                        onClick={handleTranslate}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 mx-5 animate-spin" />
                                        ) : "Translate"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Translate (Ctrl + Enter)
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
                <div className="flex items-center justify-end w-1/2 h-full px-4 py-2 md:justify-between">
                    <div className="items-center hidden text-sm font-medium md:flex md:text-base">
                        {oWordCount} words
                    </div>
                    {outputText?.length > 0 && (
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
                </div>
            </div>
        </div>
    )
}

export default Bottombar

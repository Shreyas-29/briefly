"use client";

import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { useAudioBlob, useAudioInputText, useAudioIsLoading, usePlaying } from '@/store';
import { Download, Loader2 } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

const Bottombar = () => {

    const { blob, setBlob } = useAudioBlob();

    const { inputText, setInputText } = useAudioInputText();

    const { loading, setLoading } = useAudioIsLoading();

    const { isPlaying, setIsPlaying } = usePlaying();

    const handleGenerate = useCallback(async () => {
        try {

            if (inputText.length === 0) {
                toast.error("Enter some text to translate.");
                return;
            }

            if (inputText.length > 1500) {
                toast.error("Text length should not exceed 1500 characters.");
                return;
            }

            if (isPlaying) {
                return;
            }

            setLoading(true);

            const utterance = new SpeechSynthesisUtterance(inputText);
            window.speechSynthesis.speak(utterance);

            setIsPlaying(true);

            // Convert the utterance to a Blob when speech ends
            utterance.onend = () => {
                // @ts-ignore
                const blob = new Blob([utterance.audioBuffer], { type: 'audio/wav' });
                setBlob(blob);
                // Set isSpeaking to false when speech ends
                setIsPlaying(false);
            };

            toast.success('Audio Generated Successfully');
        } catch (error) {
            console.error('Error translating text:', error);
            toast.error('Failed to translate text. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [inputText, isPlaying, setLoading]);

    const handleExportText = () => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'speech_audio.wav';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Audio exported successfully');
    };

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                handleGenerate();
            }
        };

        document.addEventListener("keydown", handleGlobalKeyDown);

        return () => {
            document.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [handleGenerate]);


    return (
        <div className="h-16 border-t border-border">
            <div className="flex items-center justify-between w-full divide-x h-14 divide-border">
                <div className="flex items-center justify-between w-1/2 h-full py-2 pl-4 pr-4">
                    <TooltipProvider>
                        <div className="hidden md:flex">
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        disabled={loading || inputText.length === 0}
                                        onClick={handleGenerate}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 mx-5 animate-spin" />
                                        ) : "Generate"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Generate (Ctrl + Enter)
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="flex md:hidden">
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="xs"
                                        disabled={inputText.length < 0 || loading}
                                        onClick={handleGenerate}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 mx-5 animate-spin" />
                                        ) : "Generate"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Generate (Ctrl + Enter)
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
                <div className="flex items-center justify-end w-1/2 h-full px-4 py-2 md:justify-between">
                    {/* {outputText?.length > 0 && ( */}
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
                        </TooltipProvider>
                    </div>
                    {/* )} */}
                </div>
            </div>
        </div>
    )
}

export default Bottombar

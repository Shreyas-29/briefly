"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import { useAudioBlob, useAudioInputText, useAudioIsLoading, useAudioURL, usePlaying } from '@/store';
import { useCallback } from 'react';
import { toast } from "sonner";

const OutputBox = () => {

    const { audio } = useAudioURL();

    const { blob, setBlob } = useAudioBlob();

    const { inputText, setInputText } = useAudioInputText();

    const { loading, setLoading } = useAudioIsLoading();

    const { isPlaying, setIsPlaying } = usePlaying();

    const handlePlay = useCallback(() => {
        try {
            if (inputText.length === 0) {
                toast.error("Enter some text to generate audio.");
                return;
            }

            setLoading(true);

            const synth = window.speechSynthesis;

            if (synth.speaking) {
                // If speech synthesis is currently speaking, cancel it to pause
                synth.cancel();
                setIsPlaying(false);
            } else {
                // If speech synthesis is not speaking, start it
                const utterance = new SpeechSynthesisUtterance(inputText);
                synth.speak(utterance);
                setIsPlaying(true);
            };
        } catch (error) {
            console.error("Error translating text:", error);
            toast.error("Failed to generate audio. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [inputText, setLoading]);

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
    };

    return (
        <div className="flex flex-col flex-wrap w-full h-full max-h-full p-2 bg-background">
            {loading ? (
                <div className="flex flex-col items-center justify-center w-full h-full my-auto">
                    <Skeleton className="h-8 rounded-sm w-52" />
                </div>
            ) : null}
            <div className="flex items-center justify-center w-full h-full gap-6 mt-6">
                <Button
                    size="sm"
                    variant="outline"
                    disabled={loading || inputText.length === 0}
                    onClick={handlePlay}
                >
                    Play Audio
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={loading || inputText.length === 0}
                    onClick={handleStop}
                >
                    Stop Audio
                </Button>
            </div>
        </div>
    )
}

export default OutputBox

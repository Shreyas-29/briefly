"use client";

import { Textarea } from '@/components/ui/textarea'
import { useInputText, useIsLoading, useTransInputWordCount } from '@/store'
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const InputBox = () => {

    const { user } = useUser();

    const { inputText, setInputText } = useInputText();

    const { loading, setLoading } = useIsLoading();

    const { wordCount, setWordCount } = useTransInputWordCount();

    const handleTranslate = async () => {
        try {

            setLoading(true);

            if (!inputText) {
                toast.error("Please enter some text to translate");
                return;
            }


        } catch (error) {
            console.log("Error translating text: ", error);
            toast.error("Failed to translate text. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const words = inputText.split(/\s+/).filter((word) => word.length > 0);
        setWordCount(words.length);
    }, [inputText, setWordCount]);

    return (
        <div className="relative h-full max-h-full overflow-y-scroll">
            <Textarea
                value={inputText ?? ""}
                onChange={(e) => setInputText(e.target.value)}
                disabled={loading}
                placeholder="Enter or Paste your text here..."
                className="w-full h-full text-base bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-transparent disabled:opacity-70 focus-visible:outline-none focus-visible:ring-transparent"
            />
        </div>
    )
}

export default InputBox

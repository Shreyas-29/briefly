"use client";

import { getText } from '@/actions';
import { useInput, useInputWordCountStore, useLoading, useTextLength } from '@/store';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';


const InputBox = () => {

    const { user } = useUser();

    const { wordCount, setWordCount } = useInputWordCountStore();

    const { inputText, setInputText, setSummarizedText } = useInput();

    const { textLength } = useTextLength();

    const { loading, setLoading } = useLoading();


    const handleSummarize = async () => {
        try {
            setLoading(true);

            // Check if inputText is empty
            if (!inputText) {
                toast.error("Please enter some text to summarize");
                return;
            }

            // Check if user is logged in and word count exceeds the limit
            if (user && wordCount > 1200) {
                toast.error("Word count exceeds the limit for logged-in users.");
                return;
            }

            // Check if user is not logged in and word count exceeds the limit
            if (!user && wordCount > 300) {
                toast.error("Word count exceeds the limit for non-logged-in users.");
                return;
            }

            // Proceed with summarization
            const summary = await getText(inputText, textLength);

            setSummarizedText(summary as string);
        } catch (error) {
            console.log("Error summarizing text: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            handleSummarize();
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
                // onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Enter or Paste your text here..."
                className="w-full h-full text-base bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-transparent disabled:opacity-70 focus-visible:outline-none focus-visible:ring-transparent"
            />
        </div>
    )
}

export default InputBox

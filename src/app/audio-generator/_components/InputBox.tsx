"use client";

import { Textarea } from '@/components/ui/textarea';
import { useAudioBlob, useAudioInputText, useAudioIsLoading, useAudioURL } from '@/store';
import { useEffect } from 'react';

const InputBox = () => {

    const { inputText, setInputText } = useAudioInputText();

    const { loading, setLoading } = useAudioIsLoading();

    const { audio, setAudio } = useAudioURL();

    const { blob, setBlob } = useAudioBlob();

    useEffect(() => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            setAudio(url);
        }
    }, [blob]);

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

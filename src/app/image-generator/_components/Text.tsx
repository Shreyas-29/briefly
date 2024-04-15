"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from "next/link";

const Text = () => {
    const [inputText, setInputText] = useState('');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const generateAudio = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/facebook/mms-tts-eng',
                { input_text: inputText },
                {
                    headers: {
                        Authorization: 'Bearer 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',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const audioData = response.data;
            console.log('audioData:', audioData)
            const audioUrl = URL.createObjectURL(new Blob([audioData.audio]));
            console.log('audioUrl:', audioUrl)
            setAudioUrl(audioUrl);
        } catch (error) {
            console.error('Error generating audio:', error);
            toast.error('Failed to generate audio. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to convert to speech"
                className="min-h-44"
            />
            <Button onClick={generateAudio} disabled={!inputText || isLoading}>
                {isLoading ? 'Generating Audio...' : 'Generate Audio'}
            </Button>
            {audioUrl && (
                <div className="mt-4">
                    <audio controls>
                        <source src={audioUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                    <Button className="mt-2">
                        <Link href={audioUrl} download="generated_audio.wav">
                            <Download className="mr-2 w-4 h-4" />
                            Download Audio
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Text;

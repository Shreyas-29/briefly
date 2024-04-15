"use client";

import { useInput, useLoading, useOutputWordCountStore, useSentenceCount } from '@/store';
import React, { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';

const OutputBox = () => {

    const { summarizedText } = useInput();

    const { setWordCount } = useOutputWordCountStore();

    const { setSentenceCount } = useSentenceCount();

    const { loading } = useLoading();

    useEffect(() => {
        const words = summarizedText?.split(/\s+/).filter((word) => word.length > 0);

        const sentences = summarizedText?.split(/[.!?]+/).filter((sentence) => sentence?.length > 0);

        setSentenceCount(sentences?.length);

        setWordCount(words.length);
    }, [summarizedText, setWordCount, setSentenceCount]);


    return (
        <div className="flex flex-wrap w-full h-full max-h-full px-3 py-2 overflow-y-scroll bg-background">
            <p className="w-full text-balance text-start">
                {summarizedText ?? ""}
            </p>

            {loading && (
                <div className="flex flex-col items-start justify-start w-full h-full mt-1 mb-auto gap-y-3">
                    <Skeleton className="w-11/12 h-3.5 rounded-sm" />
                    <Skeleton className="w-4/6 h-3.5 rounded-sm" />
                    <Skeleton className="w-4/5 h-3.5 rounded-sm" />
                    <Skeleton className="w-3/4 h-3.5 rounded-sm" />
                    <Skeleton className="w-4/5 h-3.5 rounded-sm" />
                </div>
            )}
        </div>
    )
}

export default OutputBox

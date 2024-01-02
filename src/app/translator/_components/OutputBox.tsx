"use client";

import { Skeleton } from '@/components/ui/skeleton';
import { useIsLoading, useOutputText, useTransOutputWordCount } from '@/store';
import React, { useEffect } from 'react'

const OutputBox = () => {

    const { outputText } = useOutputText();

    const { loading } = useIsLoading();

    const { setWordCount } = useTransOutputWordCount();

    useEffect(() => {
        const words = outputText?.split(/\s+/).filter((word) => word.length > 0);

        setWordCount(words?.length);
    }, [outputText, setWordCount]);

    return (
        <div className="flex flex-wrap w-full h-full max-h-full p-2 overflow-y-scroll bg-background">
            {loading ? (
                <div className="flex flex-col items-start justify-start w-full h-full mt-1 mb-auto gap-y-3">
                    <Skeleton className="w-11/12 h-3.5 rounded-sm" />
                    <Skeleton className="w-4/6 h-3.5 rounded-sm" />
                    <Skeleton className="w-4/5 h-3.5 rounded-sm" />
                </div>
            ) : (
                <p className="w-full text-balance text-start">
                    {outputText ?? ""}
                </p>
            )}
        </div>
    )
}

export default OutputBox

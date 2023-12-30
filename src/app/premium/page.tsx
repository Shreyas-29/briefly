import { Metadata } from 'next';
import React from 'react';
import Cards from './_components/Cards';

export const metadata: Metadata = {
    title: "Premium",
};

export default async function PremiumPage() {
    return (
        <div className="flex items-center flex-col justify-center w-full">
            <div className="flex flex-col items-center mx-auto py-8">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">
                    Unlock Premium Features
                </h1>
                <p className="text-muted-foreground text-center mt-4 max-w-prose">
                    Elevate your experience with a premium subscription.
                </p>
            </div>
            <Cards />
        </div>
    )
}

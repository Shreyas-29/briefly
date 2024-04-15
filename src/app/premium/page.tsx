import { Metadata } from 'next';
import React from 'react';
import Cards from './_components/Cards';

export const metadata: Metadata = {
    title: "Premium",
};

export default async function PremiumPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center py-8 mx-auto">
                <h1 className="text-2xl font-bold text-center md:text-3xl lg:text-4xl">
                    Unlock Premium Features
                </h1>
                <p className="mt-4 text-center text-muted-foreground max-w-prose">
                    Elevate your experience with a premium subscription.
                </p>
            </div>
            <Cards />
        </div>
    )
}

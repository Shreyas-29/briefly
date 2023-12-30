import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import React from 'react'
import Subscription from './_components/Subscription';

export const metadata: Metadata = {
    title: "Subscription",
};

export default function SubscriptionPage() {
    return (
        <div className="flex flex-col items-start w-full pl-4 lg:pl-8">
            <Subscription />
        </div>
    )
}
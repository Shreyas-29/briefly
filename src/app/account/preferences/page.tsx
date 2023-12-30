import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import React from 'react'
import Preferences from './_components/Preferences';

export const metadata: Metadata = {
    title: "Preferences",
};

export default function PreferencesPage() {
    return (
        <div className="flex flex-col items-start w-full pl-4 lg:pl-8">
            <Preferences />
        </div>
    )
}
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import React from 'react'
import NavLinks from './_components/NavLinks';
import Account from './_components/Account';

export const metadata: Metadata = {
    title: "Account",
};

export default function AccountPage() {
    return (
        <Account />
    )
}
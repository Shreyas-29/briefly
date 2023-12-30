"use client";

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Settings2, User, Wallet } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLinks = () => {

    const pathname = usePathname();

    const activePath = pathname.split(" ")[0];

    return (
        <div className="flex flex-col">
            <ul className="pr-4 space-y-2 md:flex flex-col hidden lg:pr-8">
                <li className="flex items-center w-full">
                    <Link href="/account" className={cn(buttonVariants({ size: "sm", variant: activePath === "/account" ? "default" : "ghost", className: "w-full flex items-center justify-start" }))}>
                        <User className="w-5 h-5 mr-2" />
                        Account
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link href="/account/subscription" className={cn(buttonVariants({ size: "sm", variant: activePath === "/account/subscription" ? "default" : "ghost", className: "w-full flex items-center justify-start" }))}>
                        <Wallet className="w-5 h-5 mr-2" />
                        Subscription
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link href="/account/preferences" className={cn(buttonVariants({ size: "sm", variant: activePath === "/account/preferences" ? "default" : "ghost", className: "w-full flex items-center justify-start" }))}>
                        <Settings2 className="w-5 h-5 mr-2" />
                        Preferences
                    </Link>
                </li>
            </ul>
            <ul className="pr-4 space-y-2 flex flex-col md:hidden lg:pr-8">
                <li className="flex items-center w-full">
                    <Link href="/account" className={cn(buttonVariants({ size: "xs", variant: activePath === "/account" ? "default" : "ghost", className: "w-full flex items-center justify-start" }))}>
                        <User className="w-4 h-4 mr-1.5" />
                        Account
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link href="/account/subscription" className={cn(buttonVariants({ size: "xs", variant: activePath === "/account/subscription" ? "default" : "ghost", className: "w-full flex items-center justify-start" }))}>
                        <Wallet className="w-4 h-4 mr-1.5" />
                        Subscription
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link href="/account/preferences" className={cn(buttonVariants({ size: "xs", variant: activePath === "/account/preferences" ? "default" : "ghost", className: "w-full flex items-center justify-start" }))}>
                        <Settings2 className="w-4 h-4 mr-1.5" />
                        Preferences
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavLinks

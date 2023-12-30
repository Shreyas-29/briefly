"use client";

import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import { SignInButton, useUser } from '@clerk/nextjs'
import { ThemeToggle } from '.'
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';


const MobileSidebar = () => {

    const { user, isLoaded } = useUser();

    const { theme, setTheme } = useTheme();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="xs" variant="ghost" className="px-2 py-2">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader className="flex flex-row items-center w-full relative space-y-0 mt-4">
                    <Image src="/logo.svg" width={50} height={50} alt="Briefly Logo" className="object-cover w-auto h-6 dark:hidden group-hover:rotate-[360deg] duration-700 ease-out transition-all" />
                    <Image src="/logo-dark.svg" width={50} height={50} alt="Briefly Logo" className="hidden object-cover w-auto h-6 dark:block" />
                    <span className="text-lg font-semibold ml-3">
                        Briefly
                    </span>
                </SheetHeader>
                <div className="flex flex-col mt-6 pt-6 border-t border-border items-center w-full gap-y-1">
                    {!isLoaded && (
                        <Skeleton className="w-full h-8" />
                    )}
                    <SignInButton mode="modal">
                        <Button variant="ghost" className="w-full flex items-center justify-start">
                            Sign In
                        </Button>
                    </SignInButton>
                    <div className="w-full bg-border h-px" />
                    <div className="w-full flex items-center justify-start">
                        {theme === "dark" ? (
                            <Button variant="ghost" className="w-full justify-start" onClick={() => setTheme("light")}>
                                Light
                            </Button>
                        ) : (
                            <Button variant="ghost" className="w-full justify-start" onClick={() => setTheme("dark")}>
                                Dark
                            </Button>
                        )}
                    </div>
                    <div className="w-full bg-border/50 h-px" />
                    <Button variant="ghost" className="w-full flex items-center justify-start">
                        Help Center
                    </Button>
                    <div className="w-full bg-border/50 h-px" />
                    <Button variant="ghost" className="w-full flex items-center justify-start text-blue-500">
                        <Link href="/premium">
                            Briefly Premium
                        </Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar


//     <SignInButton mode="modal">
//         <Button size="xs">
//             Sign In
//         </Button>
//     </SignInButton>

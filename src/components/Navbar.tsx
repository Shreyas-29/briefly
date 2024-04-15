"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { SignInButton, useUser } from '@clerk/clerk-react';
import { AudioLines, FileSearch, Gem, Languages, Menu, MessageSquareText, SpellCheck, Text } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { toast } from 'sonner';
import { MobileSidebar, ThemeToggle, UserAccount } from '.';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

// 2829c32005bc42c5a5c47538382dd14b

const Navbar = () => {

    const { user, isLoaded } = useUser();

    const pathname = usePathname();

    console.log(pathname);

    const activePath = pathname.split(" ")[0];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleLink = (value: boolean) => {
        if (value === true) {
            toast.error("This feature is not available yet.");
        } else {
            setIsOpen(false);
        }
    };

    return (
        <header className="sticky inset-x-0 top-0 z-50 w-full bg-white border-b dark:bg-[#121212] h-14 border-border">
            <div className="relative items-center justify-between hidden h-full px-8 md:flex">
                <div className="flex items-center select-none gap-x-4">
                    <div className="items-center hidden md:flex">
                        <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                            <SheetTrigger asChild>
                                <Button size="xs" variant="ghost">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full max-w-xs">
                                <SheetHeader className="mt-5">
                                    <SheetTitle>Tools</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col items-start w-full mt-8 gap-y-2">
                                    <Button variant={activePath === "/" ? "default" : "ghost"} onClick={() => handleLink(false)} asChild className="justify-start w-full">
                                        <Link href="/" className="flex items-center justify-start w-full gap-x-2">
                                            <Text className="w-5 h-5" />
                                            Summarizer
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" onClick={() => handleLink(true)} className="justify-start w-full gap-x-2">
                                        <FileSearch className="w-5 h-5" />
                                        Palgrism Checker
                                    </Button>
                                    <Button variant={activePath === "/translator" ? "default" : "ghost"} onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                                        <Link href="/translator" className="flex items-center justify-start w-full gap-x-2">
                                            <Languages className="w-5 h-5" />
                                            Translator
                                        </Link>
                                    </Button>
                                    <Button variant={activePath === "/grammar-check" ? "default" : "ghost"} onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                                        <Link href="/grammar-check" className="flex items-center justify-start w-full gap-x-2">
                                            <SpellCheck className="w-5 h-5" />
                                            Grammar Check
                                        </Link>
                                    </Button>
                                    <Button variant={activePath === "/chat" ? "default" : "ghost"} onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                                        <Link href="/chat" className="flex items-center justify-start w-full gap-x-2">
                                            <MessageSquareText className="w-5 h-5" />
                                            Chat with AI
                                        </Link>
                                    </Button>
                                    <Button variant={activePath === "/audio-generator" ? "default" : "ghost"} onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                                        <Link href="/audio-generator" className="flex items-center justify-start w-full gap-x-2">
                                            <AudioLines className="w-5 h-5" />
                                            Audio Generator
                                        </Link>
                                    </Button>
                                    {/* <Button variant="ghost" onClick={() => handleLink(true)} className="justify-start w-full gap-x-2">
                                        <LayoutGrid className="w-5 h-5" />
                                        Apps & Extensions
                                    </Button> */}
                                    <div className="w-full h-px bg-border" />
                                    <Button variant={activePath === "/premium" ? "default" : "ghost"} asChild className="justify-start w-full" onClick={() => handleLink(false)}>
                                        <Link href="/premium" className="flex items-center justify-start w-full gap-x-2">
                                            <Gem className="w-5 h-5" />
                                            Briefly Premium
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <Link href="/" className="relative group">
                        <Image src="/logo.svg" width={50} height={50} alt="Briefly Logo" className="object-cover w-auto h-6 transition-all duration-700 ease-out dark:hidden" />
                        <Image src="/logo-dark.svg" width={50} height={50} alt="Briefly Logo" className="hidden object-cover w-auto h-6 dark:block" />
                    </Link>
                </div>

                <div className="absolute top-0 z-0 flex items-center justify-center py-3.5 mx-auto -translate-x-1/2 left-1/2">
                    <span className="text-sm font-semibold text-center capitalize md:text-xl">
                        {pathname === "/" ? "Summarizer" : pathname === "/translator" ? "Translator" : pathname === "/premium" ? "Briefly Premium" : pathname === "/chat" ? "AI Chat" : pathname === "/grammar-check" ? "Grammar Check" : pathname === "/audio-generator" ? "Audio Generator" : "Briefly"}
                    </span>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle />

                    <Button size="sm" className="hidden px-4 md:flex">
                        <Link href="/premium" className="flex items-center">
                            <Gem className="w-4 h-4 mr-2" />
                            Upgrade to Pro
                        </Link>
                    </Button>

                    {user ? (
                        <UserAccount />
                    ) : (
                        <SignInButton mode="modal">
                            <Button size="sm">
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                    {!isLoaded && !user && (
                        <Skeleton className="w-16 h-9" />
                    )}
                    {!isLoaded && user && (
                        <Skeleton className="rounded-full w-9 h-9" />
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between h-full px-4 md:hidden">
                <div className="flex items-center pl-4 select-none">
                    <Link href="/" className="relative group">
                        <Image src="/logo.svg" width={50} height={50} alt="Briefly Logo" className="object-cover w-auto h-6 dark:hidden group-hover:rotate-[360deg] duration-700 ease-out transition-all" />
                        <Image src="/logo-dark.svg" width={50} height={50} alt="Briefly Logo" className="hidden object-cover w-auto h-6 dark:block" />
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <Button size="xs">
                        <Link href="/premium" className="flex items-center">
                            <Gem className="w-4 h-4 mr-2" />
                            Upgrade
                        </Link>
                    </Button>

                    {user ? (
                        <UserAccount />
                    ) : null}

                    {!isLoaded && user && (
                        <Skeleton className="w-8 h-8 rounded-full" />
                    )}

                    <MobileSidebar />
                </div>
            </div>
        </header>
    )
}

export default Navbar

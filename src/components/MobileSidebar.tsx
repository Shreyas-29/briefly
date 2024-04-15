"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from "@/components/ui/sheet";
import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { AudioLines, Gem, HelpCircle, Languages, LogIn, LogOut, Menu, MessageSquareText, SpellCheck, Sun, Text } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import { toast } from "sonner";
import FeedbackModal from "./FeedbackModal";
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';


const MobileSidebar = () => {

    const { user, isLoaded } = useUser();

    const { theme, setTheme } = useTheme();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleLink = (value: boolean) => {
        if (value === true) {
            toast.error("This feature is not available yet.");
        } else {
            setIsOpen(false);
        }
    };

    const handleHelp = () => {
        setIsModalOpen(true);
        setIsOpen(true);
    };

    return (
        <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
            <SheetTrigger asChild>
                <Button size="xs" variant="ghost" className="px-2 py-2">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader className="relative flex flex-row items-center w-full mt-4 space-y-0">
                    <Image src="/logo.svg" width={50} height={50} alt="Briefly Logo" className="object-cover w-auto h-6 dark:hidden group-hover:rotate-[360deg] duration-700 ease-out transition-all" />
                    <Image src="/logo-dark.svg" width={50} height={50} alt="Briefly Logo" className="hidden object-cover w-auto h-6 dark:block" />
                    <span className="ml-3 text-lg font-semibold">
                        Briefly
                    </span>
                </SheetHeader>
                <div className="flex flex-col items-center w-full pt-6 mt-6 border-t border-border gap-y-1">
                    {!isLoaded && !user && (
                        <Skeleton className="w-full h-8" />
                    )}
                    {/* <div className="w-full h-px bg-border/50" /> */}
                    <Button variant="ghost" onClick={() => handleLink(false)} asChild className="justify-start w-full">
                        <Link href="/" className="flex items-center justify-start w-full gap-x-2">
                            <Text className="w-5 h-5" />
                            Summarizer
                        </Link>
                    </Button>
                    <div className="w-full h-px bg-border/50" />
                    <Button variant="ghost" onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                        <Link href="/translator" className="flex items-center justify-start w-full gap-x-2">
                            <Languages className="w-5 h-5" />
                            Translator
                        </Link>
                    </Button>
                    <div className="w-full h-px bg-border/50" />
                    <Button variant="ghost" onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                        <Link href="/grammar-check" className="flex items-center justify-start w-full gap-x-2">
                            <SpellCheck className="w-5 h-5" />
                            Grammar Check
                        </Link>
                    </Button>
                    <div className="w-full h-px bg-border/50" />
                    <Button variant="ghost" onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                        <Link href="/chat" className="flex items-center justify-start w-full gap-x-2">
                            <MessageSquareText className="w-5 h-5" />
                            Chat with AI
                        </Link>
                    </Button>
                    <div className="w-full h-px bg-border/50" />
                    <Button variant="ghost" onClick={() => handleLink(false)} className="justify-start w-full gap-x-2">
                        <Link href="/audio-generator" className="flex items-center justify-start w-full gap-x-2">
                            <AudioLines className="w-5 h-5" />
                            Audio Generator
                        </Link>
                    </Button>
                    <div className="w-full h-px bg-border/50" />
                    <Button variant="ghost" onClick={handleHelp} className="flex items-center justify-start w-full gap-x-2">
                        <HelpCircle className="w-5 h-5" />
                        Help Center
                    </Button>
                    <div className="w-full h-px bg-border/50" />
                    <div className="flex items-center justify-start w-full">
                        {theme === "dark" ? (
                            <Button variant="ghost" className="justify-start w-full gap-x-2" onClick={() => setTheme("light")}>
                                <Sun className="w-5 h-5" />
                                Light
                            </Button>
                        ) : (
                            <Button variant="ghost" className="justify-start w-full gap-x-2" onClick={() => setTheme("dark")}>
                                <Sun className="w-5 h-5" />
                                Dark
                            </Button>
                        )}
                    </div>
                    <div className="w-full h-px bg-border/50" />
                    <Button variant="ghost" onClick={() => setIsOpen(false)} className="flex items-center justify-start w-full text-blue-500 hover:text-blue-600">
                        <Link href="/premium" className="flex items-center w-full gap-x-2">
                            <Gem className="w-5 h-5" />
                            Briefly Premium
                        </Link>
                    </Button>
                    {!user && (
                        <SignInButton mode="modal">
                            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex items-center justify-start w-full mt-2 text-blue-500 hover:text-blue-600 gap-x-2">
                                <LogIn className="w-5 h-5" />
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                    {user && (
                        <div className="w-full h-px bg-border/50" />
                    )}
                    {user && (
                        <SignOutButton>
                            <Button variant="ghost" onClick={() => setIsOpen(false)} className="flex items-center justify-start w-full text-red-500 hover:text-red-600 gap-x-2">
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </Button>
                        </SignOutButton>
                    )}
                </div>

                <FeedbackModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

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

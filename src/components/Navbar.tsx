"use client";

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { CircleUserRound, FileSearch, Gem, Languages, LayoutGrid, Menu, Text } from 'lucide-react';
import Image from 'next/image';
import { MobileSidebar, ThemeToggle, UserAccount } from '.';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';



const Navbar = () => {

    const { user, isLoaded } = useUser();

    const pathname = usePathname();

    const activePath = pathname.split(" ")[0];

    const handleLink = () => {
        toast.info("This feature is not available yet.");
    };

    return (
        <header className="sticky inset-x-0 top-0 z-50 w-full bg-white border-b dark:bg-[#121212] h-14 border-border">
            <div className="relative hidden md:flex items-center justify-between h-full px-8">
                <div className="flex items-center gap-x-4 select-none">
                    <div className="hidden md:flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="xs" variant="ghost">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full max-w-xs">
                                <SheetHeader className="mt-5">
                                    <SheetTitle>Tools</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col w-full items-start gap-y-2 mt-8">
                                    <Button variant={activePath === "/" ? "default" : "ghost"} asChild className="w-full justify-start">
                                        <Link href="/" className="flex items-center justify-start w-full gap-x-2">
                                            <Text className="w-5 h-5" />
                                            Summarizer
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" onClick={handleLink} className="w-full justify-start gap-x-2">
                                        <FileSearch className="w-5 h-5" />
                                        Palgrism Checker
                                    </Button>
                                    <Button variant="ghost" onClick={handleLink} className="w-full justify-start gap-x-2">
                                        <Languages className="w-5 h-5" />
                                        Translator
                                    </Button>
                                    <Button variant="ghost" onClick={handleLink} className="w-full justify-start gap-x-2">
                                        <LayoutGrid className="w-5 h-5" />
                                        Apps & Extensions
                                    </Button>
                                    <div className="w-full h-px bg-border" />
                                    <Button variant={activePath === "/premium" ? "default" : "ghost"} asChild className="w-full justify-start">
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
                        <Image src="/logo.svg" width={50} height={50} alt="Briefly Logo" className="object-cover w-auto h-6 dark:hidden duration-700 ease-out transition-all" />
                        <Image src="/logo-dark.svg" width={50} height={50} alt="Briefly Logo" className="hidden object-cover w-auto h-6 dark:block" />
                    </Link>
                </div>

                <div className="absolute top-0 z-0 flex items-center justify-center py-3.5 mx-auto -translate-x-1/2 left-1/2">
                    <span className="text-sm font-semibold text-center capitalize md:text-xl">
                        Summarizer
                    </span>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle />

                    <Button size="sm" className="px-4 hidden md:flex">
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

            <div className="flex md:hidden items-center justify-between h-full px-4">
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

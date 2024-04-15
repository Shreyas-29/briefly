"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { CircleUser, Gem, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

const UserAccount = () => {

    const { user } = useUser();

    return (
        <div className="relative flex items-center cursor-pointer">
            <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:outline-none">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10">
                        <AvatarImage
                            src={user?.imageUrl}
                            alt={user?.fullName!}
                            width={50}
                            height={50}
                            className="object-cover rounded-full"
                        />
                        <AvatarFallback>
                            {user?.fullName?.[0]}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>


                <DropdownMenuContent className="mt-2 mr-8">
                    <DropdownMenuLabel className="font-medium">
                        Email
                        <br />
                        <span className="text-sm font-normal truncate">
                            {user?.primaryEmailAddress?.emailAddress!}
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/account" className="flex items-center w-full">
                        <DropdownMenuItem className="w-full">
                            <CircleUser className="w-4 h-4 mr-2" />
                            Account
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/premium" className="flex items-center w-full md:hidden">
                        <DropdownMenuItem className="w-full">
                            <Gem className="w-4 h-4 mr-2" />
                            Premium
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/account" className="flex items-center w-full">
                        <DropdownMenuItem className="w-full">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Help Center
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <SignOutButton>
                        <DropdownMenuItem>
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </DropdownMenuItem>
                    </SignOutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserAccount

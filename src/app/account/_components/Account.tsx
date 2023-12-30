"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/clerk-react'
import React from 'react'

const Account = () => {

    const { user } = useUser();

    const provider = user?.primaryEmailAddress?.verification.strategy;

    return (
        <div className="flex flex-col items-start w-full pl-4 lg:pl-8">
            <div className="flex items-center justify-start w-full gap-x-4">
                <Avatar>
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName!} />
                    <AvatarFallback>
                        {user?.fullName![0]}
                    </AvatarFallback>
                </Avatar>
                {!user?.imageUrl && user?.fullName && (
                    <Skeleton className="w-8 h-8 rounded-full" />
                )}
                <div className="flex flex-col items-start">
                    <span className="text-base font-medium">
                        Name
                    </span>
                    {!user?.fullName && (
                        <Skeleton className="w-16 h-5 rounded-sm" />
                    )}
                    <span className="-mt-1 text-lg capitalize text-muted-foreground">
                        {user?.fullName}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-start my-4 lg:mt-8">
                <span className="text-base font-medium">
                    Email
                </span>
                <span className="text-lg text-muted-foreground">
                    {user?.primaryEmailAddress?.emailAddress}
                </span>
                <span className="text-xs text-popover-foreground">
                    Account linked with {provider === "from_oauth_google" ? "Google" : "Github"}
                </span>
            </div>
            <div className="flex flex-col items-start w-full pt-6 mt-0 border-t lg:mt-8 border-border">
                <span className="text-base font-medium">
                    Subscription
                </span>
                <span className="text-lg text-muted-foreground">
                    Free
                </span>
                <span className="text-sm text-popover-foreground">
                    Using since {new Date(user?.createdAt!).toLocaleString("en-IN", { month: "short", year: "numeric" })}
                </span>
            </div>
        </div>
    )
}

export default Account

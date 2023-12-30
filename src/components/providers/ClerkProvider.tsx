"use client";

import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";

const ClerkClientProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
            {children}
        </ClerkProvider>
    )
};

export default ClerkClientProvider;
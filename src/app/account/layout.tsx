import React from 'react';
import NavLinks from './_components/NavLinks';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-center h-[calc(100%-56px)] lg:py-16 w-full p-4 md:p-8">
            <div className="grid w-full h-full max-w-4xl grid-cols-12 p-3 mx-auto border divide-x bg-background divide-border rounded-xl border-border md:p-5 lg:p-8">
                <div className="h-full col-span-4">
                    <NavLinks />
                </div>
                <div className="h-full col-span-8">
                    {children}
                </div>
            </div>
        </div>
    )
}


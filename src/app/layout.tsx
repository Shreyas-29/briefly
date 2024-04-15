import { ClerkClientProvider, Navbar, ThemeProvider } from '@/components'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { DM_Sans, Inter, Plus_Jakarta_Sans } from 'next/font/google'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/logo.svg",
                href: "/logo.svg",
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: "/logo-dark.svg",
                href: "/logo-dark.svg",
            }
        ]
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkClientProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(
                    "font-base antialiased bg-secondary/50 min-h-screen",
                    font.className
                )}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster />
                        <Navbar />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkClientProvider>
    )
};

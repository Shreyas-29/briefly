import { ThemeToggle } from '@/components'
import React from 'react'
import { Switch } from "@/components/ui/switch"

const Preferences = () => {
    return (
        <div className="flex flex-col items-start w-full gap-y-2">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start w-4/5">
                    <span className="text-lg font-medium">
                        Color Theme
                    </span>
                    <span className="text-sm text-muted-foreground">
                        You can change the color theme of the app.
                    </span>
                </div>
                <ThemeToggle />
            </div>
            <div className="flex items-center justify-between w-full mt-4">
                <div className="flex flex-col items-start w-4/5">
                    <span className="text-lg font-medium">
                        Newsletters
                    </span>
                    <span className="text-sm text-muted-foreground">
                        Send me newsletters about new features and updates.
                    </span>
                </div>
                <Switch />
            </div>
        </div>
    )
}

export default Preferences

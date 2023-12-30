import React from 'react'
import { BottomBar, InputBox, OutputBox, TopBar } from '.'

const Container = () => {
    return (
        <div className="relative w-full h-full border bg-background shadow-2xl shadow-primary/10 dark:shadow-lg border-border rounded-xl dark:bg-[#121212">
            <TopBar />
            <div className="flex flex-col flex-1 w-full h-[calc(100%-112px)]">
                <div className="grid w-full h-full grid-cols-none divide-y md:divide-x lg:grid-cols-12 grid-rows-12 lg:grid-rows-none divide-border">
                    <div className="h-full row-span-6 p-2 lg:col-span-6">
                        <InputBox />
                    </div>
                    <div className="h-full row-span-6 p-2 lg:col-span-6">
                        <OutputBox />
                    </div>
                </div>
            </div>
            <BottomBar />
        </div>
    )
}

export default Container

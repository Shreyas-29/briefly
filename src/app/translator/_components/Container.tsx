import React from 'react'
import Topbar from './Topbar'
import InputBox from './InputBox'
import OutputBox from './OutputBox'
import Bottombar from './Bottombar'

const Container = () => {
    return (
        <div className="relative w-full h-full border bg-background shadow-2xl shadow-primary/10 dark:shadow-lg border-border rounded-xl dark:bg-[#121212">
            <Topbar />
            <div className="flex flex-col flex-1 w-full h-[calc(100%-112px)]">
                <div className="grid w-full h-full grid-cols-none divide-y md:divide-y-0 md:divide-x lg:grid-cols-12 grid-rows-12 lg:grid-rows-none divide-border">
                    <div className="h-full row-span-6 p-2 lg:col-span-6">
                        <InputBox />
                    </div>
                    <div className="h-full row-span-6 p-2 lg:col-span-6">
                        <OutputBox />
                    </div>
                </div>
            </div>
            <Bottombar />
        </div>
    )
}

export default Container

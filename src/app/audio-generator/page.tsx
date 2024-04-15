import React from 'react'
import Container from "./_components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audio Generator",
};

const AudioGeneratorPage = () => {
    return (
        <div className="flex items-center justify-center w-full max-h-[80%] h-full mx-auto mt-12 max-w-7xl px-4 md:px-8">
            <Container />
        </div>
    )
}

export default AudioGeneratorPage

import { Metadata } from 'next';
import React from 'react';
import Container from "./_components/Container";

export const metadata: Metadata = {
    title: "Chat",
};

const ChatPage = () => {
    return (
        <div className="flex items-center justify-center w-full max-h-[80%] h-full mx-auto mt-12 max-w-7xl px-4 md:px-8">
            <Container />
        </div>
    )
};

export default ChatPage;

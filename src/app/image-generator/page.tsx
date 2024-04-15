import { Metadata } from 'next';
import React from 'react';
import Container from './_components/Container';
import Text from "./_components/Text";

export const metadata: Metadata = {
    title: "Image Generator",
};

const ImageGeneratorPage = () => {
    return (
        <div className="flex items-center justify-start w-full max-h-[80%] h-full mx-auto mt-12 max-w-7xl px-4 md:px-8">
            <Text />
        </div>
    )
};

export default ImageGeneratorPage;

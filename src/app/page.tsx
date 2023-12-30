import { Container } from '@/components';
import { auth, currentUser } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "Text Summarizer | Briefly",
    }
};

export default async function HomePage() {

    const user = await currentUser();
    console.log(user);
    return (
        <div className="flex items-center justify-center w-full max-h-[80%] h-full mx-auto mt-12 max-w-7xl px-4 md:px-8">
            <Container />
        </div>
    )
}

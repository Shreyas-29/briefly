import { create } from 'zustand';

interface SentenceCount {
    sentenceCount: number;
    setSentenceCount: (count: number) => void;
}

const useSentenceCount = create<SentenceCount>((set) => ({
    sentenceCount: 0,
    setSentenceCount: (count) => set({ sentenceCount: count }),
}));

export default useSentenceCount;

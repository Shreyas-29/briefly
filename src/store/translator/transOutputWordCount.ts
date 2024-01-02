import { create } from "zustand";

interface TransOutputWordCount {
    wordCount: number;
    setWordCount: (count: number) => void;
}

const useTransOutputWordCount = create<TransOutputWordCount>((set) => ({
    wordCount: 0,
    setWordCount: (count) => set({ wordCount: count }),
}));

export default useTransOutputWordCount;
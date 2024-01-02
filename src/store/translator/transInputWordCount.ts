import { create } from "zustand";

interface TransInputWordCount {
    wordCount: number;
    setWordCount: (count: number) => void;
}

const useTransInputWordCount = create<TransInputWordCount>((set) => ({
    wordCount: 0,
    setWordCount: (count) => set({ wordCount: count }),
}));

export default useTransInputWordCount;
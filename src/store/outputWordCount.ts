import { create } from 'zustand';

interface WordCountStore {
    wordCount: number;
    setWordCount: (count: number) => void;
}

const useOutputWordCountStore = create<WordCountStore>((set) => ({
    wordCount: 0,
    setWordCount: (count) => set({ wordCount: count }),
}));

export default useOutputWordCountStore;

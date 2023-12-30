import { create } from 'zustand';

interface OutputStore {
    inputText: string;
    setInputText: (text: string) => void;
    wordCount: number;
    setWordCount: (count: number) => void;
    summarizedText: string;
    setSummarizedText: (text: string) => void;
}

const useOutput = create<OutputStore>((set) => ({
    inputText: '',
    setInputText: (text) => set({ inputText: text }),
    wordCount: 0,
    setWordCount: (count) => set({ wordCount: count }),
    summarizedText: '',
    setSummarizedText: (text) => set({ summarizedText: text }),
}));

export default useOutput;

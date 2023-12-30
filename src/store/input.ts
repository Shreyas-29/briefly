import { create } from 'zustand';

export interface InputStore {
    inputText: string;
    setInputText: (text: string) => void;
    wordCount: number;
    setWordCount: (count: number) => void;
    summarizedText: string;
    setSummarizedText: (text: string) => void;
}

const useInput = create<InputStore>((set) => ({
    inputText: '',
    setInputText: (text) => set({ inputText: text }),
    wordCount: 0,
    setWordCount: (count) => set({ wordCount: count }),
    summarizedText: '',
    setSummarizedText: (text) => set({ summarizedText: text }),
}));

export default useInput;

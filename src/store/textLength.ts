import { create } from "zustand";

interface TextLengthState {
    textLength: number;
    setTextLength: (textLength: number) => void;
}

const useTextLength = create<TextLengthState>((set) => ({
    textLength: 25,
    setTextLength: (textLength) => set({ textLength }),
}));

export default useTextLength;
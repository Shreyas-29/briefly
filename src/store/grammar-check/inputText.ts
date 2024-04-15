import { create } from "zustand";

interface InputTextState {
    inputText: string;
    setInputText: (inputText: string) => void;
}

const useInputText = create<InputTextState>((set) => ({
    inputText: "",
    setInputText: (inputText) => set({ inputText }),
}));

export default useInputText;

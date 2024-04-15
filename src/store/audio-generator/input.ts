import { create } from "zustand";

interface InputTextState {
    inputText: string;
    setInputText: (inputText: string) => void;
}

const useAudioInputText = create<InputTextState>((set) => ({
    inputText: "",
    setInputText: (inputText) => set({ inputText }),
}));

export default useAudioInputText;

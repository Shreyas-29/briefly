import { create } from "zustand";

interface OutputTextState {
    outputText: string;
    setOutputText: (outputText: string) => void;
}

const useOutputText = create<OutputTextState>((set) => ({
    outputText: "",
    setOutputText: (outputText) => set({ outputText }),
}));

export default useOutputText;
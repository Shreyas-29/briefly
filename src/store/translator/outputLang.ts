import { create } from "zustand";

interface OutputLangState {
    outputLang: string;
    setOutputLang: (outputLang: string) => void;
}

const useOutputLang = create<OutputLangState>((set) => ({
    outputLang: "de",
    setOutputLang: (outputLang) => set({ outputLang }),
}));

export default useOutputLang;

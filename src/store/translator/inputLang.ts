import { create } from "zustand";

interface InputLangState {
    inputLang: string;
    setInputLang: (inputLang: string) => void;
}

const useInputLang = create<InputLangState>((set) => ({
    // set inputlang to marathi by default
    inputLang: "en",
    setInputLang: (inputLang) => set({ inputLang }),
}));

export default useInputLang;

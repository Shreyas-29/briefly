import { create } from "zustand";

interface ErrorState {
    error: boolean;
    setError: (error: boolean) => void;
}

const useError = create<ErrorState>(set => ({
    error: false,
    setError: (error: boolean) => set({ error })
}));

export default useError;

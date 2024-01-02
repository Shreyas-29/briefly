import { create } from "zustand";

interface LoadingState {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const useIsLoading = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));

export default useIsLoading;
import { create } from "zustand";

interface Loading {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const useLoading = create<Loading>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));

export default useLoading;
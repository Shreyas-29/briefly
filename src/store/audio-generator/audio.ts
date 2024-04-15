import { create } from "zustand";

interface AudioURLState {
    blob: Blob | null;
    setBlob: (blob: Blob) => void;
}

const useAudioBlob = create<AudioURLState>((set) => ({
    blob: null,
    setBlob: (blob) => set({ blob }),
}));

export default useAudioBlob;

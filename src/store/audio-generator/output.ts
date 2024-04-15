import { create } from "zustand";

interface AudioURLState {
    audio: string | null;
    setAudio: (audio: string) => void;
}

const useAudioURL = create<AudioURLState>((set) => ({
    audio: null,
    setAudio: (audio) => set({ audio }),
}));

export default useAudioURL;

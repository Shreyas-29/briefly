import { create } from 'zustand';

interface PlayingStore {
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
}

const usePlaying = create<PlayingStore>((set) => ({
    isPlaying: false,
    setIsPlaying: (playing) => set({ isPlaying: playing }),
}));

export default usePlaying;

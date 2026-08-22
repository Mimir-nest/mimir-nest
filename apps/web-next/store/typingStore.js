import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const initialStats = {
    wpm: [],
    raw: [],
    errors: [],
    accuracy: 0,
    time: null,
    isComplete: false,
    characters: {
        correct: 0,
        incorrect: 0,
        extra: 0,
        missed: 0
    },
    totalErrors: 0
};
export const useTypingStore = create()(persist((set) => ({
    stats: initialStats,
    settings: {
        showErrors: true,
        soundEffects: false,
    },
    setSettings: (newSettings) => set((state) => ({
        settings: {
            ...state.settings,
            ...newSettings
        }
    })),
    addWPMSample: (wpm, raw, errors) => set((state) => ({
        stats: {
            ...state.stats,
            wpm: [...state.stats.wpm, wpm],
            raw: [...state.stats.raw, raw],
            errors: [...state.stats.errors, errors],
            totalErrors: errors
        }
    })),
    updateAccuracy: (accuracy) => set((state) => ({
        stats: {
            ...state.stats,
            accuracy
        }
    })),
    updateCharacters: (chars) => set((state) => ({
        stats: {
            ...state.stats,
            characters: chars
        }
    })),
    setComplete: (time) => set((state) => ({
        stats: {
            ...state.stats,
            isComplete: true,
            time
        }
    })),
    resetStats: () => set({ stats: initialStats })
}), {
    name: 'typing-store',
    partialize: (state) => ({ settings: state.settings })
}));

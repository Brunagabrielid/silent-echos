import { create } from 'zustand';

export interface Choice {
  text: string;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  backgrounds: string[]; // for dynamic scenes (image sequence)
  character?: string;
  text: string;
  choices?: Choice[];
  nextSceneId?: string; // auto proceed if no choices
  delayBetweenFrames?: number; // fallback: 500ms
  triggerUnlock?: string; // If reading this unlocks a specific chapter
}

export interface Chapter {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  initialSceneId: string;
  scenes: Record<string, Scene>;
}

interface GameState {
  unlockedChapters: string[]; // list of chapter IDs
  currentChapterId: string | null;
  currentSceneId: string | null;
  
  unlockChapter: (chapterId: string) => void;
  startChapter: (chapterId: string, initialSceneId: string) => void;
  goToScene: (sceneId: string) => void;
  exitToMenu: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  unlockedChapters: ['chapter1'], // Chapter 1 is unlocked by default
  currentChapterId: null,
  currentSceneId: null,
  
  unlockChapter: (chapterId) => set((state) => ({
    unlockedChapters: state.unlockedChapters.includes(chapterId) 
      ? state.unlockedChapters 
      : [...state.unlockedChapters, chapterId]
  })),
  
  startChapter: (chapterId, initialSceneId) => set({
    currentChapterId: chapterId,
    currentSceneId: initialSceneId,
  }),
  
  goToScene: (sceneId) => set({
    currentSceneId: sceneId,
  }),
  
  exitToMenu: () => set({
    currentChapterId: null,
    currentSceneId: null,
  }),
}));

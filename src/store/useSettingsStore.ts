import { create } from 'zustand';

interface SettingsState {
  fontSize: number;
  highContrast: boolean;
  textSpeed: number; // in ms per char
  setFontSize: (size: number) => void;
  setHighContrast: (enabled: boolean) => void;
  setTextSpeed: (speed: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  fontSize: 18,
  highContrast: false,
  textSpeed: 50,
  setFontSize: (size) => {
    document.documentElement.style.setProperty('--font-base-size', `${size}px`);
    set({ fontSize: size });
  },
  setHighContrast: (enabled) => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    set({ highContrast: enabled });
  },
  setTextSpeed: (speed) => {
    document.documentElement.style.setProperty('--text-speed', `${speed}ms`);
    set({ textSpeed: speed });
  },
}));

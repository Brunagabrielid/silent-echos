import { create } from 'zustand';
import i18n from '../i18n';

interface SettingsState {
  fontSize: number;
  highContrast: boolean;
  textSpeed: number; // in ms per char (UI will invert this)
  language: string;
  masterVolume: number; // 0 to 1
  setFontSize: (size: number) => void;
  setHighContrast: (enabled: boolean) => void;
  setTextSpeed: (speed: number) => void;
  setLanguage: (lang: string) => void;
  setMasterVolume: (volume: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  fontSize: 18,
  highContrast: false,
  textSpeed: 50,
  language: 'pt-BR',
  masterVolume: 0.5,
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
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
  setMasterVolume: (volume) => {
    set({ masterVolume: volume });
  }
}));

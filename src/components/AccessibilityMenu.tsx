import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../store/useSettingsStore';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { 
    fontSize, setFontSize, 
    highContrast, setHighContrast, 
    textSpeed, setTextSpeed, 
    masterVolume, setMasterVolume, 
    language, setLanguage 
  } = useSettingsStore();

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button 
          className="fixed top-4 right-4 z-50 p-2 bg-black/50 border border-accent rounded-full hover:bg-black/80 transition-colors focus:ring-2 ring-primary"
        >
          <Settings size={24} className="text-primary" />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm"
              >
                <Dialog.Content asChild>
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-background border border-accent p-6 max-w-md w-full relative outline-none"
                  >
                    <Dialog.Close asChild>
                      <button className="absolute top-4 right-4 text-accent hover:text-primary">
                        <X size={24} />
                      </button>
                    </Dialog.Close>
                    <Dialog.Title className="text-2xl mb-6 font-mystery font-bold border-b border-accent pb-2">
                      {t('menu.settings')}
                    </Dialog.Title>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block mb-2 font-readable text-sm text-gray-400">
                          {t('menu.font_size')} ({fontSize}px)
                        </label>
                        <input 
                          type="range" 
                          min="12" max="32" 
                          value={fontSize} 
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 font-readable text-sm text-gray-400">
                          {t('menu.text_speed')}
                        </label>
                        <input 
                          type="range" 
                          min="10" max="150" 
                          value={160 - textSpeed} 
                          onChange={(e) => setTextSpeed(160 - Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 font-readable text-sm text-gray-400">
                          {t('menu.sound_volume')} ({Math.round(masterVolume * 100)}%)
                        </label>
                        <input 
                          type="range" 
                          min="0" max="1" step="0.01"
                          value={masterVolume} 
                          onChange={(e) => setMasterVolume(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-readable text-sm text-gray-400">{t('menu.high_contrast')}</span>
                        <button 
                          onClick={() => setHighContrast(!highContrast)}
                          className={`px-4 py-2 text-sm font-bold border transition-colors ${highContrast ? 'bg-primary text-background border-primary' : 'bg-transparent text-primary border-accent'}`}
                        >
                          {highContrast ? t('menu.on') : t('menu.off')}
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-readable text-sm text-gray-400">{t('menu.language')}</span>
                        <select 
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="bg-black text-white border border-accent p-2 focus:ring-1 ring-primary"
                        >
                          <option value="pt-BR">Português (BR)</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

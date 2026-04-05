import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../store/useSettingsStore';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, setFontSize, highContrast, setHighContrast, textSpeed, setTextSpeed } = useSettingsStore();

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-black/50 border border-accent rounded-full hover:bg-black/80 transition-colors"
        aria-label="Acessibilidade"
      >
        <Settings size={24} className="text-primary" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-background border border-accent p-6 max-w-md w-full relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-accent hover:text-primary"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl mb-6 font-mystery font-bold border-b border-accent pb-2">Configurações</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-readable text-sm text-gray-400">Tamanho da Fonte ({fontSize}px)</label>
                  <input 
                    type="range" 
                    min="12" max="32" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-readable text-sm text-gray-400">Velocidade do Texto (menor = mais rápido)</label>
                  <input 
                    type="range" 
                    min="10" max="150" 
                    value={textSpeed} 
                    onChange={(e) => setTextSpeed(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-readable text-sm text-gray-400">Alto Contraste / Legibilidade</span>
                  <button 
                    onClick={() => setHighContrast(!highContrast)}
                    className={`px-4 py-2 text-sm font-bold border transition-colors ${highContrast ? 'bg-primary text-background border-primary' : 'bg-transparent text-primary border-accent'}`}
                  >
                    {highContrast ? 'ATIVADO' : 'DESATIVADO'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playTypewriterSound } from '../../utils/audio';
import { useSettingsStore } from '../../store/useSettingsStore';
import type { Choice } from '../../store/useGameStore';

interface DialogBoxProps {
  character?: string;
  text: string;
  choices?: Choice[];
  onComplete: () => void;
  onChoiceSelect: (sceneId: string) => void;
}

export default function DialogBox({ character, text, choices, onComplete, onChoiceSelect }: DialogBoxProps) {
  const { textSpeed, fontSize } = useSettingsStore();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    
    if (!text) {
        setIsTyping(false);
        return;
    }

    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (text.charAt(i - 1) !== ' ' && text.charAt(i - 1) !== '\n') {
        playTypewriterSound();
      }
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, textSpeed);

    return () => clearInterval(interval);
  }, [text, textSpeed]);

  const handleInteraction = () => {
    if (isTyping) {
      // Skip typing
      setDisplayedText(text);
      setIsTyping(false);
    } else if (!choices || choices.length === 0) {
      onComplete();
    }
  };

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 p-8 cursor-pointer select-none"
      onClick={handleInteraction}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="max-w-4xl mx-auto relative">
        {/* Choices Overlay */}
        <AnimatePresence>
          {!isTyping && choices && choices.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-x-0 bottom-full mb-8 flex items-center justify-center pointer-events-none"
            >
              <div className="flex flex-col gap-4 pointer-events-auto w-full max-w-md">
                {choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChoiceSelect(choice.nextSceneId);
                    }}
                    className="bg-black border border-accent hover:border-primary hover:bg-white/10 px-8 py-4 text-center font-readable transition-colors tracking-widest shadow-2xl"
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitles / Text Box Area */}
        <div className="bg-black/90 border border-accent p-6 relative min-h-[150px] shadow-2xl">
          {character && (
            <div className="absolute -top-6 left-6 bg-primary text-black px-4 py-1 font-bold font-mystery text-lg tracking-wider">
              {character}
            </div>
          )}
          <p className="font-readable leading-relaxed whitespace-pre-wrap min-h-[3rem]">{displayedText}</p>
          
          {/* Cursor indicator */}
          {!isTyping && (!choices || choices.length === 0) && (
            <div className="absolute bottom-4 right-4 animate-pulse text-accent">▼</div>
          )}
        </div>
      </div>
    </div>
  );
}

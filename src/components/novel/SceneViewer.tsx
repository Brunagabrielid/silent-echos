import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SceneViewerProps {
  backgrounds: string[];
  delayMs?: number;
}

export default function SceneViewer({ backgrounds, delayMs = 500 }: SceneViewerProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    setFrameIndex(0);
    
    if (backgrounds.length <= 1) return;

    // Dynamic scene playback
    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        if (prev < backgrounds.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 2000); // 2 segundos de delay force
    
    return () => clearInterval(interval);
  }, [backgrounds, delayMs]);

  if (!backgrounds || backgrounds.length === 0) return null;

  return (
    <div className="absolute inset-0 bg-black z-0 flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={backgrounds[frameIndex] + frameIndex}
          src={backgrounds[frameIndex]}
          className={`absolute w-full h-full object-cover transition-all ${backgrounds.length > 1 ? 'grayscale' : 'grayscale opacity-70'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: backgrounds.length > 1 ? 1 : 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Fade in & out sempre aplicado
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}

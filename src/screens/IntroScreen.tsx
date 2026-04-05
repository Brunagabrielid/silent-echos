import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IntroScreen() {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const text = "Existem memórias que deveriam permanecer apagadas...";

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, 2000); // Aguarda a animação do título principal
    
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/menu');
        }, 2000);
      }
    }, 60); 
    
    return () => clearInterval(interval);
  }, [isTyping, navigate]);

  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="text-white text-3xl md:text-5xl tracking-widest font-mystery font-bold glitch"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        SILENT ECHOES
      </motion.h1>
      <motion.p
        className="text-accent mt-4 font-readable tracking-wider"
        style={{ minHeight: '1.5rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.1 }}
      >
        {displayedText}
        {isTyping && displayedText.length < text.length && <span className="animate-pulse ml-1 text-primary">|</span>}
      </motion.p>
    </motion.div>
  );
}

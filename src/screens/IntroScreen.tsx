import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IntroScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/menu');
    }, 4500); // 4.5s intro
    return () => clearTimeout(timer);
  }, [navigate]);

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Existem memórias que deveriam permanecer apagadas...
      </motion.p>
    </motion.div>
  );
}

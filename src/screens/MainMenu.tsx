import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { chapter1 } from '../data/chapter1';

export default function MainMenu() {
  const navigate = useNavigate();
  const { startChapter } = useGameStore();

  return (
    <motion.div 
      className="w-full h-full flex flex-col justify-center pl-16 bg-black relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black opacity-80 pointer-events-none z-0"></div>

      <div className="relative mb-16 h-[180px] w-full max-w-[500px]">
        <motion.h1 
          className="text-7xl font-bold font-mystery text-white absolute inset-0 z-10 glitch"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 65% 48%, 55% 58%, 35% 60%, 0 65%)' }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: [-50, 0, 0, -5], y: [0, 0, 0, -4], rotate: [0, 0, 0, -2], opacity: [0, 1, 1, 1] }}
          transition={{ duration: 3, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
        >
          SILENT<br />ECHOES
        </motion.h1>
        <motion.h1 
          className="text-7xl font-bold font-mystery text-white absolute inset-0 z-10 glitch opacity-90"
          style={{ clipPath: 'polygon(100% 45%, 100% 100%, 0 100%, 0 65%, 35% 60%, 55% 58%, 65% 48%)' }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: [-50, 0, 0, 5], y: [0, 0, 0, 4], rotate: [0, 0, 0, 2], opacity: [0, 1, 1, 1] }}
          transition={{ duration: 3, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
        >
          SILENT<br />ECHOES
        </motion.h1>
      </div>

      <div className="flex flex-col items-start space-y-6 z-10">
        <MenuButton 
          onClick={() => {
            startChapter(chapter1.id, chapter1.initialSceneId);
            navigate('/play');
          }} 
          delay={0.4}
        >
          Novo Jogo
        </MenuButton>
        <MenuButton onClick={() => navigate('/chapters')} delay={0.5}>
          Selecionar Capítulo
        </MenuButton>
      </div>
    </motion.div>
  );
}

function MenuButton({ children, onClick, delay }: { children: React.ReactNode, onClick: () => void, delay: number }) {
  return (
    <motion.button
      onClick={onClick}
      className="text-2xl font-readable text-accent hover:text-white transition-colors uppercase tracking-widest group flex items-center"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
    >
      <span className="opacity-0 group-hover:opacity-100 mr-2 transition-opacity text-white">►</span>
      {children}
    </motion.button>
  );
}

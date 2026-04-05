import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { chapter1 } from '../data/chapter1';
import { chapter2 } from '../data/chapter2';

export default function ChapterSelect() {
  const navigate = useNavigate();
  const { unlockedChapters, startChapter } = useGameStore();

  const chapters = [chapter1, chapter2];

  const handleStartChapter = (id: string, initialSceneId: string) => {
    startChapter(id, initialSceneId);
    navigate('/play');
  };

  return (
    <motion.div 
      className="w-full h-full p-12 bg-black flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => navigate('/menu')} className="text-accent hover:text-white mb-8 self-start font-readable uppercase tracking-wider text-sm transition-colors">
        ← Voltar
      </button>

      <h1 className="text-4xl font-mystery font-bold mb-12 border-b border-accent pb-4 inline-block self-start">ARQUIVOS CONFIDENCIAIS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chapters.map((chap, idx) => {
          const isUnlocked = unlockedChapters.includes(chap.id);
          return (
            <motion.div 
              key={chap.id}
              className={`border p-1 relative overflow-hidden transition-all ${isUnlocked ? 'border-primary cursor-pointer hover:scale-105' : 'border-accent opacity-60'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => isUnlocked ? handleStartChapter(chap.id, chap.initialSceneId) : undefined}
            >
              <div className="h-48 w-full bg-accent relative overflow-hidden">
                <img src={chap.thumbnail} alt={chap.title} className={`w-full h-full object-cover transition-all ${isUnlocked ? 'grayscale hover:grayscale-0' : 'grayscale blur-sm'}`} />
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Lock size={48} className="text-accent" />
                  </div>
                )}
              </div>
              <div className="p-4 bg-black">
                <h3 className="text-xl font-bold font-mystery mb-2">{chap.title}</h3>
                {isUnlocked ? (
                  <p className="text-sm font-readable text-accent">{chap.description}</p>
                ) : (
                  <p className="text-sm font-readable text-accent italic">Dados corrompidos ou insuficientes.</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

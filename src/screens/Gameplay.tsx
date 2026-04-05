import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { chapter1 } from '../data/chapter1';
import { chapter2 } from '../data/chapter2';
import SceneViewer from '../components/novel/SceneViewer';
import DialogBox from '../components/novel/DialogBox';
import { motion } from 'framer-motion';

const chaptersRecord = {
  chapter1,
  chapter2,
};

export default function Gameplay() {
  const navigate = useNavigate();
  const { currentChapterId, currentSceneId, goToScene, exitToMenu, unlockChapter } = useGameStore();

  useEffect(() => {
    if (!currentChapterId || !currentSceneId) {
      navigate('/menu');
    }
  }, [currentChapterId, currentSceneId, navigate]);

  if (!currentChapterId || !currentSceneId) return null;

  const currentChapter = chaptersRecord[currentChapterId as keyof typeof chaptersRecord];
  const currentScene = currentChapter?.scenes[currentSceneId];

  if (!currentScene) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black gap-4">
        <h1 className="text-primary text-xl">Erro: Cena não encontrada.</h1>
        <button onClick={() => { exitToMenu(); navigate('/menu'); }} className="underline text-accent">Sair</button>
      </div>
    );
  }

  const proceedFlow = (nextId: string | undefined) => {
    if (currentScene.triggerUnlock) {
      unlockChapter(currentScene.triggerUnlock);
    }

    if (nextId) {
      if (nextId.startsWith('end_')) {
         exitToMenu();
         navigate('/chapters');
      } else {
         goToScene(nextId);
      }
    } else {
      exitToMenu();
      navigate('/chapters');
    }
  };

  const handleNext = () => proceedFlow(currentScene.nextSceneId);
  const handleChoiceSelect = (nextSceneId: string) => proceedFlow(nextSceneId);

  return (
    <motion.div 
      className="w-full h-full relative bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-4 left-4 z-50 flex gap-4">
        <button 
          onClick={() => {
            exitToMenu();
            navigate('/menu');
          }}
          className="text-accent hover:text-white font-readable uppercase tracking-wider text-sm transition-colors bg-black/50 px-3 py-1 rounded"
        >
          &lt; Menu
        </button>
      </div>

      <SceneViewer 
        backgrounds={currentScene.backgrounds} 
        delayMs={currentScene.delayBetweenFrames} 
      />

      <DialogBox 
        character={currentScene.character}
        text={currentScene.text}
        choices={currentScene.choices}
        onComplete={handleNext}
        onChoiceSelect={handleChoiceSelect}
      />
    </motion.div>
  );
}

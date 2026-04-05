import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './screens/IntroScreen';
import MainMenu from './screens/MainMenu';
import ChapterSelect from './screens/ChapterSelect';
import Gameplay from './screens/Gameplay';
import AccessibilityMenu from './components/AccessibilityMenu';

function App() {
  const location = useLocation();

  return (
    <div className="w-screen h-screen overflow-hidden bg-background text-foreground relative">
      <AccessibilityMenu />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/chapters" element={<ChapterSelect />} />
          <Route path="/play" element={<Gameplay />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

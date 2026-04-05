import type { Chapter } from '../store/useGameStore';
import home from '../../assets-mock/futuristic-home-8397004_1280.jpg';
import raccoon from '../../assets-mock/raccoon-8504925_1280.png';
import woman from '../../assets-mock/woman-8725575_1280.jpg';

export const chapter2: Chapter = {
  id: 'chapter2',
  title: 'O Arquivo Secreto',
  description: 'Adentrando as memórias sombrias...',
  thumbnail: home,
  initialSceneId: 'scene_1',
  scenes: {
    scene_1: {
      id: 'scene_1',
      backgrounds: [home],
      text: 'Você chegou. A sala está escura e incrivelmente silenciosa.',
      nextSceneId: 'scene_2'
    },
    scene_2: {
      id: 'scene_2',
      backgrounds: [home, raccoon, woman], // Dynamic scene!
      delayBetweenFrames: 300,
      text: 'Vários flashes começam a aparecer em sua mente. Vultos estranhos...!',
      choices: [
        { text: 'Tentar focar na visão', nextSceneId: 'scene_3a' },
        { text: 'Fechar os olhos firmemente', nextSceneId: 'scene_3b' }
      ]
    },
    scene_3a: {
      id: 'scene_3a',
      backgrounds: [woman],
      character: 'Voz',
      text: 'Você conseguiu me ver. A verdade estava sempre na sua frente.',
      nextSceneId: 'end_chap2_good'
    },
    scene_3b: {
      id: 'scene_3b',
      backgrounds: [raccoon],
      text: 'A escuridão consome tudo. Você perdeu a sua última chance.',
      nextSceneId: 'end_chap2_bad'
    },
    end_chap2_good: {
      id: 'end_chap2_good',
      backgrounds: [woman],
      text: '[ FIM DO CAPÍTULO 2 - Final Verdadeiro ]',
    },
    end_chap2_bad: {
      id: 'end_chap2_bad',
      backgrounds: [home],
      text: '[ FIM DO CAPÍTULO 2 - Final Ruim ]',
    }
  }
};

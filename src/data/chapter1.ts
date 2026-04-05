import type { Chapter } from '../store/useGameStore';
import girl from '../../assets-mock/girl-8435339_1280.webp';
import girl2 from '../../assets-mock/girl-8880144_1280.webp';

export const chapter1: Chapter = {
  id: 'chapter1',
  title: 'O Início Sombrio',
  description: 'Seu primeiro dia parece normal, até você descobrir o segredo.',
  thumbnail: girl,
  initialSceneId: 'scene_1',
  scenes: {
    scene_1: {
      id: 'scene_1',
      backgrounds: [girl],
      character: '???',
      text: 'Onde estou? Tudo parece estar girando...',
      nextSceneId: 'scene_2'
    },
    scene_2: {
      id: 'scene_2',
      backgrounds: [girl2],
      character: 'Desconhecida',
      text: 'Você não deveria estar aqui. Fuja enquanto pode.',
      choices: [
        { text: 'Quem é você?', nextSceneId: 'scene_3a' },
        { text: '(Correr)', nextSceneId: 'scene_3b' }
      ]
    },
    scene_3a: {
      id: 'scene_3a',
      backgrounds: [girl2],
      character: 'Desconhecida',
      text: 'Apenas uma lembrança. Encontre o cofre na sala secreta.',
      triggerUnlock: 'chapter2',
      choices: [
        { text: 'O que isso significa?', nextSceneId: 'end_chap1' }
      ]
    },
    scene_3b: {
      id: 'scene_3b',
      backgrounds: [girl],
      text: 'Você tenta correr, mas suas pernas parecem pesadas. O chão cede...',
      nextSceneId: 'end_chap1'
    },
    end_chap1: {
      id: 'end_chap1',
      backgrounds: [girl],
      text: '[ FIM DO CAPÍTULO 1 - Volte ao menu principal ]',
    }
  }
};

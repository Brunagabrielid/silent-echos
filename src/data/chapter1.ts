import type { Chapter } from '../store/useGameStore';
import girl from '../../assets-mock/girl-8435339_1280.webp';
import girl2 from '../../assets-mock/girl-8880144_1280.webp';

export const chapter1: Chapter = {
  id: 'chapter1',
  title: 'chapters.chapter1.title',
  description: 'chapters.chapter1.description',
  thumbnail: girl,
  initialSceneId: 'scene_1',
  scenes: {
    scene_1: {
      id: 'scene_1',
      backgrounds: [girl],
      character: 'characters.unknown',
      text: 'chapters.chapter1.scene_1.text',
      nextSceneId: 'scene_2'
    },
    scene_2: {
      id: 'scene_2',
      backgrounds: [girl2],
      character: 'characters.unknown',
      text: 'chapters.chapter1.scene_2.text',
      choices: [
        { text: 'chapters.chapter1.scene_2.choice_1', nextSceneId: 'scene_3a' },
        { text: 'chapters.chapter1.scene_2.choice_2', nextSceneId: 'scene_3b' }
      ]
    },
    scene_3a: {
      id: 'scene_3a',
      backgrounds: [girl2],
      character: 'characters.unknown',
      text: 'chapters.chapter1.scene_3a.text',
      triggerUnlock: 'chapter2',
      choices: [
        { text: 'chapters.chapter1.scene_3a.choice_1', nextSceneId: 'end_chap1' }
      ]
    },
    scene_3b: {
      id: 'scene_3b',
      backgrounds: [girl],
      text: 'chapters.chapter1.scene_3b.text',
      nextSceneId: 'end_chap1'
    },
    end_chap1: {
      id: 'end_chap1',
      backgrounds: [girl],
      text: 'chapters.chapter1.end.text',
    }
  }
};

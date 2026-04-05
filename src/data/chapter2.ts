import type { Chapter } from '../store/useGameStore';
import home from '../../assets-mock/futuristic-home-8397004_1280.jpg';
import raccoon from '../../assets-mock/raccoon-8504925_1280.png';
import woman from '../../assets-mock/woman-8725575_1280.jpg';

export const chapter2: Chapter = {
  id: 'chapter2',
  title: 'chapters.chapter2.title',
  description: 'chapters.chapter2.description',
  thumbnail: home,
  initialSceneId: 'scene_1',
  scenes: {
    scene_1: {
      id: 'scene_1',
      backgrounds: [home],
      text: 'chapters.chapter2.scene_1.text',
      nextSceneId: 'scene_2'
    },
    scene_2: {
      id: 'scene_2',
      backgrounds: [home, raccoon, woman], // Dynamic scene!
      delayBetweenFrames: 300,
      text: 'chapters.chapter2.scene_2.text',
      choices: [
        { text: 'chapters.chapter2.scene_2.choice_1', nextSceneId: 'scene_3a' },
        { text: 'chapters.chapter2.scene_2.choice_2', nextSceneId: 'scene_3b' }
      ]
    },
    scene_3a: {
      id: 'scene_3a',
      backgrounds: [woman],
      character: 'characters.voice',
      text: 'chapters.chapter2.scene_3a.text',
      nextSceneId: 'end_chap2_good'
    },
    scene_3b: {
      id: 'scene_3b',
      backgrounds: [raccoon],
      text: 'chapters.chapter2.scene_3b.text',
      nextSceneId: 'end_chap2_bad'
    },
    end_chap2_good: {
      id: 'end_chap2_good',
      backgrounds: [woman],
      text: 'chapters.chapter2.end_good.text',
    },
    end_chap2_bad: {
      id: 'end_chap2_bad',
      backgrounds: [home],
      text: 'chapters.chapter2.end_bad.text',
    }
  }
};

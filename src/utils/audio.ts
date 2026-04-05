import { useSettingsStore } from '../store/useSettingsStore';

let audioCtx: AudioContext | null = null;

export const playTypewriterSound = () => {
  const { masterVolume } = useSettingsStore.getState();
  if (masterVolume <= 0) return;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // Gentle mechanical click sound
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); 
  oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

  // Quick decay
  // We use textSpeed to scale the length slightly or just hardcode a click duration.
  const duration = 0.03;
  gainNode.gain.setValueAtTime(masterVolume * 0.05, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
};

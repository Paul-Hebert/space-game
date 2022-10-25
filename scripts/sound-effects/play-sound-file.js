import { soundFiles } from "./sound-files.js";
import { muted } from "./muted.js";
import { audioContext } from "./audio-context.js";

export function playSoundFile(name, volumeModifier = 1, loop = false) {
  if (muted) return;
  if (!soundFiles[name]) return;

  const sound = soundFiles[name];

  const source = audioContext.createBufferSource();
  if (loop) source.loop = true;
  source.buffer = sound.buffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = sound.baseVolume * volumeModifier;
  gainNode.connect(audioContext.destination);

  source.connect(gainNode);
  source.start();
}

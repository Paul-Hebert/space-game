import { playerState } from "./state/player-state.js";
import { distanceBetweenPoints } from "./math/distance-between-points.js";

const audioContext = new AudioContext();
// TODO: Better way to handle this global state
window.muted = true;

const soundFiles = [
  { file: "laser.wav", baseVolume: 0.02 },
  { file: "explosion.wav", baseVolume: 0.02 },
  { file: "engine.mp3", baseVolume: 0.01 },
  { file: "music.wav", baseVolume: 0.1 },
];
const sounds = await createSounds();

async function createSounds() {
  const sounds = {};

  soundFiles.forEach(async (sound) => {
    // TODO: Using await in a loop is bad for perf
    const buffer = await loadSoundfile(`/audio/${sound.file}`);
    sounds[sound.file.split(".")[0]] = {
      buffer,
      baseVolume: sound.baseVolume,
    };
  });

  return sounds;
}

export function playSound(name, volumeModifier = 1, loop = false) {
  if (window.muted) return;
  if (!sounds[name]) return;

  const sound = sounds[name];

  const source = audioContext.createBufferSource();
  if (loop) source.loop = true;
  source.buffer = sound.buffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = sound.baseVolume * volumeModifier;
  gainNode.connect(audioContext.destination);

  source.connect(gainNode);
  source.start();
}

async function loadSoundfile(name) {
  return fetch(name)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      return audioBuffer;
    });
}

export function volumeRelativeToPlayer({ x, y }) {
  const distance = distanceBetweenPoints({ x, y }, playerState);

  if (distance === 0) {
    return 1;
  }

  return 1 / (distance / 100);
}

/**
 * Helper function to emit a beep sound in the browser using the Web Audio API.
 *
 * @param {number} duration - The duration of the beep sound in milliseconds.
 * @param {number} frequency - The frequency of the beep sound.
 * @param {number} volume - The volume of the beep sound.
 */
export function playCustomSound({
  duration = 100,
  frequency = 240,
  volume = 1,
  nodeType = "sine",
}) {
  if (muted) return;

  let oscillatorNode = audioContext.createOscillator();
  let gainNode = audioContext.createGain();
  oscillatorNode.connect(gainNode);

  // Set the oscillator frequency in hertz
  oscillatorNode.frequency.value = frequency;

  // Set the type of oscillator
  oscillatorNode.type = nodeType;
  gainNode.connect(audioContext.destination);

  // Set the gain to the volume
  gainNode.gain.value = volume * 0.01;

  // Start audio with the desired duration
  oscillatorNode.start(audioContext.currentTime);
  oscillatorNode.stop(audioContext.currentTime + duration * 0.001);
}

import { audioContext } from "./audio-context.js";

export const soundFiles = await createSounds([
  { file: "laser.wav", baseVolume: 0.02 },
  { file: "laser-2.wav", baseVolume: 0.3 },
  { file: "laser-4.wav", baseVolume: 0.3 },
  { file: "explosion.wav", baseVolume: 0.02 },
  { file: "engine.mp3", baseVolume: 0.01 },
  { file: "music.mp3", baseVolume: 0.1 },
  { file: "resource-pickup.wav", baseVolume: 0.1 },
]);

async function createSounds(sounds) {
  const buffers = {};

  sounds.forEach(async (sound) => {
    // TODO: Using await in a loop is bad for perf
    const buffer = await loadSoundfile(`/audio/${sound.file}`);
    buffers[sound.file.split(".")[0]] = {
      buffer,
      baseVolume: sound.baseVolume,
    };
  });

  return buffers;
}

async function loadSoundfile(name) {
  return fetch(name)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      return audioBuffer;
    });
}

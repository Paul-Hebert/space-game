import { audioContext } from "./audio-context.js";

export const soundFiles = await createSounds([
  { file: "laser.wav", baseVolume: 0.02 },
  { file: "laser-4.wav", baseVolume: 0.3 },
  { file: "small-shot.wav", baseVolume: 0.3 },
  { file: "pop.wav", baseVolume: 0.3 },
  { file: "explosion.wav", baseVolume: 0.02 },
  { file: "explosion-2.mp3", baseVolume: 0.1 },
  { file: "engine.mp3", baseVolume: 0.01 },
  { file: "music-2.mp3", baseVolume: 0.4 },
  { file: "resource-pickup.wav", baseVolume: 0.1 },
  { file: "notification-2.mp3", baseVolume: 0.1 },
  { file: "hyper-speed.mp3", baseVolume: 0.3 },
  { file: "success-echo.mp3", baseVolume: 0.5 },
  { file: "upgrade-pickup.wav", baseVolume: 0.75 },
  { file: "upgrade-dropped.wav", baseVolume: 0.5 },
  { file: "lost-2.wav", baseVolume: 0.1 },
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

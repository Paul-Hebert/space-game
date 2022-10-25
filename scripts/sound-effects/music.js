import { playSoundFile } from "./play-sound-file.js";

export function initMusic() {
  return playSoundFile("music", 0.4, true);
}

import { muted } from "./muted.js";
import { audioContext } from "./audio-context.js";

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

const myAudioContext = new AudioContext();
const muted = true;

/**
 * Helper function to emit a beep sound in the browser using the Web Audio API.
 *
 * @param {number} duration - The duration of the beep sound in milliseconds.
 * @param {number} frequency - The frequency of the beep sound.
 * @param {number} volume - The volume of the beep sound.
 */
export function playSound({
  duration = 100,
  frequency = 240,
  volume = 1,
  nodeType = "sine",
}) {
  if (muted) return;

  let oscillatorNode = myAudioContext.createOscillator();
  let gainNode = myAudioContext.createGain();
  oscillatorNode.connect(gainNode);

  // Set the oscillator frequency in hertz
  oscillatorNode.frequency.value = frequency;

  // Set the type of oscillator
  oscillatorNode.type = nodeType;
  gainNode.connect(myAudioContext.destination);

  // Set the gain to the volume
  gainNode.gain.value = volume * 0.01;

  // Start audio with the desired duration
  oscillatorNode.start(myAudioContext.currentTime);
  oscillatorNode.stop(myAudioContext.currentTime + duration * 0.001);
}

export let muted = true;

export function toggleMute(on = null) {
  if (on !== null) {
    muted = on;
  } else {
    muted = !muted;
  }
}

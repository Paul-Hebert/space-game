export let playerControlsEnabled = false;

export function enablePlayerControls() {
  playerControlsEnabled = true;
}

export function disablePlayerControls() {
  playerControlsEnabled = false;
}

export function togglePlayerControls() {
  playerControlsEnabled = !playerControlsEnabled;
}

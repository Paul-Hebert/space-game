import { playerState } from "../state/player-state.js";

const shieldEl = document.querySelector(".shields");

export function updateShieldBar() {
  if (playerState.shields > playerState.maxShields) {
    playerState.shields = playerState.maxShields;
  }

  shieldEl.value = (playerState.shields / playerState.maxShields) * 100;
}

export function updateShieldBarSize() {
  shieldEl.style.setProperty("--max-shields", playerState.maxShields);
}

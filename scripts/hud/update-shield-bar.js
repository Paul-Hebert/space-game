import { playerState } from "../state/player-state.js";

const shieldEl = document.querySelector(".shields");

export function updateShieldBar() {
  if (playerState.shields > playerState.maxShields) {
    playerState.shields = playerState.maxShields;
  }

  const percent = (playerState.shields / playerState.maxShields) * 100;
  if (shieldEl.value !== percent) {
    shieldEl.value = percent;
  }
}

export function updateShieldBarSize() {
  shieldEl.style.setProperty("--max-shields", playerState.maxShields);
}

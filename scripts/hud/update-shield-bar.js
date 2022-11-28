import { playerState } from "../state/player-state.js";

const shieldWrapper = document.querySelector(".shields-ui");
const shieldEl = document.querySelector(".shields");

export function updateShieldBar() {
  if (!playerState.maxShields) return;

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

export function hideShieldBar() {
  shieldWrapper.setAttribute("hidden", "");
}

export function showShieldBar() {
  shieldWrapper.removeAttribute("hidden");
}

import { playerState } from "../state/player-state.js";

const healthEl = document.querySelector(".health");

export function updateHealthBar() {
  if (playerState.health > playerState.maxHealth) {
    playerState.health = playerState.maxHealth;
  }

  healthEl.value = (playerState.health / playerState.maxHealth) * 100;
}

export function updateHealthBarSize() {
  healthEl.style.setProperty("--max-health", playerState.maxHealth);
}

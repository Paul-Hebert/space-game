import { playerState } from "../state/player-state.js";

const healthEl = document.querySelector(".health");

export function updateHealthBar() {
  if (playerState.health > playerState.maxHealth) {
    playerState.health = playerState.maxHealth;
  }

  const percent = (playerState.health / playerState.maxHealth) * 100;
  if (healthEl.value !== percent) {
    healthEl.value = percent;
  }
}

export function updateHealthBarSize() {
  healthEl.style.setProperty("--max-health", playerState.maxHealth);
}

import { playerState } from "../state/player-state.js";

const healthEl = document.querySelector(".health");

export function updateHealth() {
  if (playerState.health > playerState.maxHealth) {
    playerState.health = playerState.maxHealth;
  }

  healthEl.value = (playerState.health / playerState.maxHealth) * 100;

  if (playerState.health < 0) {
    alert("You Lose");
  }
}

import { levels } from "../levels/levels.js";
import { gameStats } from "../state/game-stats.js";

export function displayGameStats(parentSelector) {
  const parentEl = document.querySelector(parentSelector);

  const sectorsClearedEl = parentEl.querySelector(".sectors-cleared");
  if (sectorsClearedEl) {
    sectorsClearedEl.textContent = `${gameStats.sectorsCleared}/${levels.length} sectors cleared.`;
  }

  const shipsDestroyedEl = parentEl.querySelector(".ships-destroyed");
  if (shipsDestroyedEl) {
    shipsDestroyedEl.textContent = `${gameStats.shipsDestroyed} ships destroyed.`;
  }
}

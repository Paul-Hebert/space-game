import { tutorial } from "./tutorial.js";
import { level1 } from "./level1.js";
import { newLevel } from "./new-level.js";
import { showMenu } from "../hud/menus.js";
import { level2 } from "./level2.js";
import { level3 } from "./level3.js";
import { level4 } from "./level4.js";
import { level5 } from "./level5.js";
import { shipsDestroyed } from "../state/game-stats.js";
import { fightLevel } from "./random/fight.js";
import { playerState } from "../state/player-state.js";
import { startHyperSpeedJump } from "../actions/hyper-speed-jump.js";

export let currentLevel = 0;

export function resetCurrentLevel() {
  currentLevel = 0;
}

export function nextLevel() {
  startHyperSpeedJump(() => {
    newLevel(levels[currentLevel]);
  });
}

export function completeLevel() {
  if (playerState.health <= 0) return;

  currentLevel++;
  if (levels[currentLevel]) {
    showMenu("nextLevel");
  } else {
    document.querySelector(
      ".success-menu .ships-destroyed"
    ).textContent = `${shipsDestroyed} ships destroyed`;
    showMenu("success");
  }
}

export const levels = [
  tutorial,
  () => {
    fightLevel({ difficulty: 8 });
  },
  level2,
  () => {
    fightLevel({ difficulty: 12 });
  },
  level4,
  () => {
    fightLevel({ difficulty: 20 });
  },
  level3,
  () => {
    fightLevel({ difficulty: 30 });
  },
  level1,
  () => {
    fightLevel({ difficulty: 50 });
  },
  level5,
  () => {
    fightLevel({ difficulty: 100 });
  },
];

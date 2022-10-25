import { tutorial } from "./tutorial.js";
import { level1 } from "./level1.js";
import { newLevel } from "./new-level.js";
import { showMenu } from "../hud/menus.js";
import { level2 } from "./level2.js";
import { level3 } from "./level3.js";
import { shipsDestroyed } from "../game-stats.js";

export let currentLevel = 0;

export function resetCurrentLevel() {
  currentLevel = 0;
}

export function nextLevel() {
  newLevel(levels[currentLevel]);
}

export function completeLevel() {
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

export const levels = [tutorial, level2, level1, level3];

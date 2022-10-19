import { tutorial } from "./tutorial.js";
import { level1 } from "./level1.js";
import { newLevel } from "./new-level.js";
import { showMenu } from "../hud/menus.js";

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
    showMenu("success");
  }
}

export const levels = [tutorial, level1];

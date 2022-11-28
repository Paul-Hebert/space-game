import { tutorial } from "./tutorial.js";
import { level1 } from "./level1.js";
import { showMenu } from "../hud/menus.js";
import { level2 } from "./level2.js";
import { level3 } from "./level3.js";
import { level4 } from "./level4.js";
import { level5 } from "./level5.js";
import { gameStats } from "../state/game-stats.js";
import { fightLevel } from "./types/fight.js";
import { playerState } from "../state/player-state.js";
import { startHyperSpeedJump } from "../actions/hyper-speed-jump.js";
import { displayGameStats } from "../actions/display-game-stats.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { addMessageToQueue, removeAllMessages } from "../hud/messaging.js";
import { theOverseer } from "./bosses/the-overseer.js";

const sectorTitle = document.querySelector(".sector-title");

export let currentLevel = 0;

export function resetCurrentLevel() {
  currentLevel = 0;
}

export function nextLevel() {
  sectorTitle.classList.add("is-hidden");
  removeAllMessages();

  startHyperSpeedJump(() => {
    levels[currentLevel].action();
    sectorTitle.textContent = levels[currentLevel].title;
    sectorTitle.classList.remove("is-hidden");
  });
}

export function completeLevel() {
  if (playerState.health <= 0) return;

  playSoundFile("success-echo");

  gameStats.sectorsCleared++;

  currentLevel++;
  if (levels[currentLevel]) {
    addMessageToQueue({
      content: `
        <h3>Sector Cleared!</h3>
        <p>
          ${gameStats.sectorsCleared}/${levels.length} sectors cleared!
        </p>`,
      dismissText: "Next Sector",
      nextAction: nextLevel,
    });
  } else {
    displayGameStats(".success-menu");
    showMenu("success");
  }
}

export const levels = [
  {
    title: "Company Mining Colony",
    action: tutorial,
  },
  {
    title: "Out of the Frying Pan",
    action: level2,
  },
  {
    title: "Into the Fire",
    action: () => {
      fightLevel({ difficulty: 6 });
    },
  },
  {
    title: "The Overseer",
    action: theOverseer,
  },
  {
    title: "Outside New Sol X",
    action: () => {
      fightLevel({ difficulty: 12 });
    },
  },
  {
    title: "Ambushed By Company Drones",
    action: level4,
  },
  {
    title: "Company Resupply Depot",
    action: () => {
      fightLevel({ difficulty: 16 });
    },
  },
  {
    title: "Company Logistics HQ",
    action: level3,
  },
  {
    title: "The Edge of the Belt",
    action: () => {
      fightLevel({ difficulty: 25 });
    },
  },
  {
    title: "The Big Empty",
    action: level1,
  },
  {
    title: "In Hot Pursuit",
    action: () => {
      fightLevel({ difficulty: 50 });
    },
  },
  {
    title: "Almost Home",
    action: level5,
  },
  {
    title: "The Final Battle",
    action: () => {
      fightLevel({ difficulty: 75 });
    },
  },
];

import "./graphics/canvas.js";
import { playerState } from "./state/player-state.js";
import { gameLoop } from "./game-loop.js";
import { hideAllMenus, hideMenu, toggleMenu } from "./hud/menus.js";
import { newGame } from "./new-game.js";
import { addRandomShip } from "./actions/add-random-ship.js";
import { nextLevel } from "./levels/levels.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { muted, toggleMute } from "../sound-effects/muted.js";

newGame();

window.addEventListener("keydown", (e) => {
  if (e.key === "p") {
    toggleMenu("pause");
    gameLoop.toggle();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "f") {
    toggleFullScreen();
  }
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

document.querySelector(".resume-button").addEventListener("click", () => {
  hideMenu("pause");
  gameLoop.play();
});

document.querySelectorAll(".restart-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideAllMenus();
    newGame();
  });
});

document.querySelectorAll(".next-level-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideAllMenus();
    nextLevel();
  });
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "Shift") {
    playerState.currentGun++;
    if (playerState.currentGun >= playerState.weapons.length) {
      playerState.currentGun = 0;
    }
  }
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "s") {
    addRandomShip();
  }
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "m") {
    toggleMute();
    playSoundFile("music", 0.2, true);
  }
});

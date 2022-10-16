import "./size-canvas.js";
import { playerState } from "./state/player-state.js";
import { gameLoop } from "./game-loop.js";
import { hideAllMenus, hideMenu, toggleMenu } from "./hud/menus.js";
import { newGame } from "./new-game.js";
import { addRandomShip } from "./actions/add-random-ship.js";

newGame();

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleMenu("pause");
    gameLoop.toggle();
  }
});

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

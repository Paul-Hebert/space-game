import "./graphics/canvas.js";
import { playerState } from "./state/player-state.js";
import { gameLoop } from "./game-loop.js";
import { hideAllMenus, hideMenu, toggleMenu } from "./hud/menus.js";
import { newGame } from "./new-game.js";
import { nextLevel } from "./levels/levels.js";
import { muted, toggleMute } from "./sound-effects/muted.js";
import { initMusic } from "./sound-effects/music.js";
import { setControlOption } from "./state/control-option.js";

let music = false;

window.addEventListener("keydown", (e) => {
  if (e.key === "p") {
    toggleMenu("pause");
    gameLoop.toggle();
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

document.querySelectorAll(".start-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (document.querySelector('[name="full-screen"]').checked) {
      toggleFullScreen();
    }
    if (document.querySelector('[name="enable-sound"]').checked) {
      toggleMute(false);
      music = initMusic();
    }
    setControlOption(document.querySelector('[name="controls"]:checked').value);
    hideAllMenus();
    newGame();
    document.querySelector(".game").classList.add("is-started");
  });
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "d" || key === "Shift") {
    playerState.currentGun++;
    if (playerState.currentGun >= playerState.weapons.length) {
      playerState.currentGun = 0;
    }
  }
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "m") {
    toggleMute();

    if (muted && music) {
      music.pause();
    } else if (!muted) {
      if (music) {
        music.play();
      } else {
        initMusic();
      }
    }
  }
});

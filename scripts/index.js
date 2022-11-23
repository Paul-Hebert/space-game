import "./graphics/canvas.js";
import { playerState } from "./state/player-state.js";
import { gameLoop } from "./game-loop.js";
import { hideAllMenus, hideMenu, showMenu, toggleMenu } from "./hud/menus.js";
import { newGame } from "./new-game.js";
import { nextLevel } from "./levels/levels.js";
import { muted, toggleMute } from "./sound-effects/muted.js";
import { initMusic } from "./sound-effects/music.js";
import { setControlOption } from "./state/control-option.js";
import { updateCurrentWeapon } from "./hud/update-weapons.js";
import { resetMap } from "./state/map-data.js";

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

document.querySelectorAll(".resume-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideAllMenus();
    gameLoop.play();
  });
});

document.querySelectorAll(".upgrade-complete-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideMenu("weaponUpgrade");
    gameLoop.play();
  });
});

document.querySelectorAll(".resume-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideAllMenus();
    gameLoop.play();
  });
});

document.querySelectorAll(".restart-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideAllMenus();
    resetMap();
    newGame();
    gameLoop.play();
  });
});

document.querySelectorAll(".next-level-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideAllMenus();
    nextLevel();
  });
});

document.querySelectorAll(".settings-button").forEach((button) => {
  button.addEventListener("click", () => {
    hideAllMenus();
    showMenu("settings");
  });
});

document.querySelectorAll(".start-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (document.querySelector('[name="full-screen"]').checked) {
      toggleFullScreen();
    }
    if (document.querySelector('[name="enable-sound"]').checked) {
      toggleMute(false);

      if (document.querySelector('[name="enable-music"]').checked) {
        music = initMusic();
      }
    }
    setControlOption(document.querySelector('[name="controls"]:checked').value);
    hideAllMenus();
    newGame();
    document.querySelector(".game").classList.add("is-started");
  });
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "Shift") {
    playerState.currentGun++;
    if (playerState.currentGun >= playerState.weapons.length) {
      playerState.currentGun = 0;
    }
    updateCurrentWeapon();
  }

  if (key === "m" || key === "M") {
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

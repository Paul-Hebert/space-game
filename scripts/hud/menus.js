import {
  disablePlayerControls,
  enablePlayerControls,
  togglePlayerControls,
} from "../state/player-controls-enabled.js";
import { gameLoop } from "../game-loop.js";

export const menus = {
  pause: document.querySelector(".pause-menu"),
  restart: document.querySelector(".restart-menu"),
  success: document.querySelector(".success-menu"),
  start: document.querySelector(".start-menu"),
  settings: document.querySelector(".settings-menu"),
  shieldUpgrade: document.querySelector(".shield-upgrade-menu"),
};

export function showMenu(name) {
  disablePlayerControls();
  menus[name].classList.add("is-shown");
  setTimeout(() => {
    menus[name].querySelector("button")?.focus();
  }, 100);
}

export function hideMenu(name) {
  enablePlayerControls();
  menus[name].classList.remove("is-shown");
  gameLoop.play();
}

export function toggleMenu(name) {
  togglePlayerControls();
  menus[name].classList.toggle("is-shown");
}

export function hideAllMenus() {
  Object.keys(menus).forEach((name) => {
    hideMenu(name);
  });
}

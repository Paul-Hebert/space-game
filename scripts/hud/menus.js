import {
  disablePlayerControls,
  enablePlayerControls,
  togglePlayerControls,
} from "../state/player-controls-enabled.js";

const menus = {
  pause: document.querySelector(".pause-menu"),
  restart: document.querySelector(".restart-menu"),
  success: document.querySelector(".success-menu"),
  nextLevel: document.querySelector(".next-level-menu"),
  start: document.querySelector(".start-menu"),
  upgrade: document.querySelector(".upgrade-menu"),
};

export function showMenu(name) {
  disablePlayerControls();
  menus[name].classList.add("is-shown");
}

export function hideMenu(name) {
  enablePlayerControls();
  menus[name].classList.remove("is-shown");
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

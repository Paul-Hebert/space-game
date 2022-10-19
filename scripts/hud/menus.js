const menus = {
  pause: document.querySelector(".pause-menu"),
  restart: document.querySelector(".restart-menu"),
  success: document.querySelector(".success-menu"),
  nextLevel: document.querySelector(".next-level-menu"),
};

export function showMenu(name) {
  menus[name].classList.add("is-shown");
}

export function hideMenu(name) {
  menus[name].classList.remove("is-shown");
}

export function toggleMenu(name) {
  menus[name].classList.toggle("is-shown");
}

export function hideAllMenus() {
  Object.keys(menus).forEach((name) => {
    hideMenu(name);
  });
}

import { playerState } from "../state/player-state.js";

const weaponEl = document.querySelector(".current-weapon");

export function updateCurrentWeapon() {
  weaponEl.textContent = playerState.weapons[playerState.currentGun].name;
}

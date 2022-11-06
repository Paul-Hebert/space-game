import { playerState } from "../state/player-state.js";

const weaponsList = document.querySelector(".weapons-list");

export function updateCurrentWeapon() {
  document.querySelector(".current-weapon")?.classList.remove("current-weapon");
  document
    .querySelector(
      `.weapon[data-name='${playerState.weapons[playerState.currentGun].name}']`
    )
    ?.classList.add("current-weapon");
}

export function updateWeapons() {
  console.log(weaponsList);

  console.log(
    playerState.weapons
      .map(
        (weapon, i) =>
          `
    <li
      data-name="${weapon.name}"
      class="weapon ${i === playerState.currentGun ? "current-weapon" : ""}
    >
      ${weapon.name}
    </li>
  `
      )
      .join("")
  );
  weaponsList.innerHTML = playerState.weapons
    .map(
      (weapon, i) =>
        `
    <li
      data-name="${weapon.name}"
      class="weapon ${i === playerState.currentGun ? "current-weapon" : ""}"
    >
      ${weapon.name}
    </li>
  `
    )
    .join("");
}

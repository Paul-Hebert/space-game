import { BaseWeapon } from "./base-weapon.js";

export class Pew extends BaseWeapon {
  name = "pew";
  speed = 30;
  reloadSpeed = 5;
  bulletRadius = 6;
  bulletColor = "red";
  damage = 5;
  maxAge = 35;

  graphic = document.getElementById("pew");

  shoot(playerState) {
    return this.bulletStream(playerState, 7, 2);
  }
}

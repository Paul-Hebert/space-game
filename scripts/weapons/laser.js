import { BaseWeapon } from "./base-weapon.js";

export class Laser extends BaseWeapon {
  name = "Class 3 Restricted Laser";
  speed = 50;
  reloadSpeed = 50;
  bulletRadius = 4;
  bulletColor = "yellow";
  damage = 1;
  maxAge = 30;
  sound = "laser-2";

  graphic = document.getElementById("laser");

  shoot(playerState) {
    return this.bulletStream(playerState, 40, 4);
  }
}

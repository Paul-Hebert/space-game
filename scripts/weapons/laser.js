import { BaseWeapon } from "./base-weapon.js";

export class Laser extends BaseWeapon {
  name = "laser";
  speed = 50;
  reloadSpeed = 50;
  bulletRadius = 4;
  bulletColor = "yellow";
  damage = 1;
  maxAge = 30;

  shoot(playerState) {
    return this.bulletStream(playerState, 40, 4);
  }
}

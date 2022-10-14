import { BaseWeapon } from "./base-weapon.js";

export class Pew extends BaseWeapon {
  name = "pew";
  speed = 30;
  reloadSpeed = 5;
  bulletRadius = 4;
  bulletColor = "red";
  damage = 5;
  maxAge = 40;

  shoot(playerState) {
    return this.bulletStream(playerState, 5, 2);
  }
}

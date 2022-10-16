import { BaseWeapon } from "./base-weapon.js";

export class StarterWeapon extends BaseWeapon {
  name = "pew";
  speed = 30;
  reloadSpeed = 6;
  bulletRadius = 3;
  bulletColor = "red";
  damage = 5;
  maxAge = 50;

  shoot(playerState) {
    return this.bulletStream(playerState, 20, 2);
  }
}

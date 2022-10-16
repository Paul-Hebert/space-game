import { BaseWeapon } from "./base-weapon.js";

export class StarterWeapon extends BaseWeapon {
  name = "pew";
  speed = 25;
  reloadSpeed = 6;
  bulletRadius = 3;
  bulletColor = "red";
  damage = 3;
  maxAge = 30;

  shoot(playerState) {
    return this.bulletStream(playerState, 20, 2);
  }
}

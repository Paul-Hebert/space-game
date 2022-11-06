import { BaseWeapon } from "./base-weapon.js";

export class StasisLaser extends BaseWeapon {
  name = "Stasis Laser";
  speed = 0;
  reloadSpeed = 0;
  bulletRadius = 5;
  bulletColor = "yellow";
  damage = 2;
  maxAge = 1;

  shoot(playerState) {
    return this.bulletStream(playerState, 10, 10);
  }

  range() {
    return 100;
  }
}

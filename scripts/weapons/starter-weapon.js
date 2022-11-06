import { BaseWeapon } from "./base-weapon.js";

export class StarterWeapon extends BaseWeapon {
  name = "Old Mining Laser";
  speed = 25;
  reloadSpeed = 10;
  bulletRadius = 3;
  bulletColor = "yellow";
  damage = 12;
  maxAge = 40;
  sound = "small-shot";

  shoot(playerState) {
    return this.bulletStream(playerState, 15, 2);
  }
}

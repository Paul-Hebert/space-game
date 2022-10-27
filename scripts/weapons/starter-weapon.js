import { BaseWeapon } from "./base-weapon.js";

export class StarterWeapon extends BaseWeapon {
  name = "starter";
  speed = 25;
  reloadSpeed = 10;
  bulletRadius = 3;
  bulletColor = "yellow";
  damage = 3;
  maxAge = 40;
  sound = "small-shot";

  shoot(playerState) {
    return this.bulletStream(playerState, 15, 2);
  }
}

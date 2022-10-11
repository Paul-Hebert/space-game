import { BaseWeapon } from "./base-weapon.js";

export class GodMode extends BaseWeapon {
  name = "god-mode";
  speed = 200;
  reloadSpeed = 1;
  bulletRadius = 10;
  bulletColor = "purple";
  damage = 100;
  maxAge = 10;

  shoot(playerState) {
    return this.bulletStream(playerState, 40, 5);
  }
}

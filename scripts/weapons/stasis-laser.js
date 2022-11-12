import { BaseWeapon } from "./base-weapon.js";

export class StasisLaser extends BaseWeapon {
  name = "Stasis Laser";
  speed = 0;
  reloadSpeed = 0;
  bulletRadius = 10;
  bulletColor = "yellow";
  damage = 2;
  maxAge = 1;
  bulletsPerShot = 10;
}

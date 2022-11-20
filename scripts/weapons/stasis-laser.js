import { BaseWeapon } from "./base-weapon.js";

export class StasisLaser extends BaseWeapon {
  name = "Short-Range Mining Laser";
  description = "Packs a punch up close.";

  speed = 0;
  reloadSpeed = 0;
  bulletRadius = 10;
  bulletColor = "yellow";
  damage = 2;
  maxAge = 1;
  bulletsPerShot = 10;
}

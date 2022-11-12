import { BaseWeapon } from "./base-weapon.js";

export class StarterWeapon extends BaseWeapon {
  name = "Stolen Mining Laser";
  speed = 25;
  reloadSpeed = 10;
  bulletRadius = 3;
  bulletColor = "yellow";
  damage = 12;
  maxAge = 40;
  sound = "small-shot";
  bulletsPerShot = 15;
}

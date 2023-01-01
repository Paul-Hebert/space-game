import { BaseWeapon } from "./base-weapon.js";

export class RepeatLaser extends BaseWeapon {
  name = "Quick-Repeat Laser";
  description = "A faster firing, less powerful laser.";

  speed = 60;
  reloadSpeed = 20;
  bulletRadius = 5;
  bulletColor = "yellow";
  damage = 6;
  maxAge = 30;
  sound = "laser-4";
  bulletsPerShot = 30;

  graphic = document.getElementById("laser");
}

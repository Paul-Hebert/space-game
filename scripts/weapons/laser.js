import { BaseWeapon } from "./base-weapon.js";

export class Laser extends BaseWeapon {
  name = "Class 3 Restricted Laser";
  speed = 50;
  reloadSpeed = 50;
  bulletRadius = 4;
  bulletColor = "yellow";
  damage = 7.5;
  maxAge = 30;
  sound = "laser-4";
  bulletsPerShot = 40;

  graphic = document.getElementById("laser");
}

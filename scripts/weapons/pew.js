import { BaseWeapon } from "./base-weapon.js";

export class Pew extends BaseWeapon {
  name = "Discount Death Beam";
  speed = 30;
  reloadSpeed = 5;
  bulletRadius = 6;
  bulletColor = "red";
  damage = 10;
  maxAge = 35;
  bulletsPerShot = 7;
  graphic = document.getElementById("pew");
}

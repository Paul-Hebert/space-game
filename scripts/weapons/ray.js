import { BaseWeapon } from "./base-weapon.js";

export class Ray extends BaseWeapon {
  name = "ray";
  speed = 10;
  reloadSpeed = 1;
  bulletRadius = 10;
  bulletColor = "blue";
  damage = 10;
  maxAge = 40;
}

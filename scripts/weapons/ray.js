import { BaseWeapon } from "./base-weapon.js";

export class Ray extends BaseWeapon {
  name = "Deconstructor Ray";
  speed = 20;
  reloadSpeed = 1;
  bulletRadius = 10;
  bulletColor = "blue";
  damage = 12;
  maxAge = 40;
}

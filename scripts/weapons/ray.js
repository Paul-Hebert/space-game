import { BaseWeapon } from "./base-weapon.js";

export class Ray extends BaseWeapon {
  name = "Deconstructor Ray";
  description = "A standard issue deconstruction tool.";

  speed = 30;
  reloadSpeed = 1;
  bulletRadius = 10;
  bulletColor = "blue";
  damage = 12;
  maxAge = 15;
}

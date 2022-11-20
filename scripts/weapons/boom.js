import { BaseWeapon } from "./base-weapon.js";

export class Boom extends BaseWeapon {
  name = "Bazooka Ray";
  description = "Deadlier than it looks.";
  speed = 30;
  reloadSpeed = 3;
  bulletRadius = 10;
  bulletColor = "green";
  damage = 40;
  maxAge = 30;
}

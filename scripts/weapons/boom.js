import { BaseWeapon } from "./base-weapon.js";

export class Boom extends BaseWeapon {
  name = "boom";
  speed = 30;
  reloadSpeed = 3;
  bulletRadius = 10;
  bulletColor = "green";
  damage = 30;
  maxAge = 30;
}

import { BaseShip } from "./base.js";
import { Ray } from "../weapons/ray.js";

export class SparrowShip extends BaseShip {
  graphic = document.getElementById("sparrow");

  size = 100;

  resourceCount = 0;
  maxHealth = 200;
  health = 200;
  maxSpeed = 8;

  weapons = [new Ray()];
}

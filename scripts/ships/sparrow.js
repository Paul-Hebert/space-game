import { BaseShip } from "./base.js";
import { Ray } from "../weapons/ray.js";

export class SparrowShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  graphic = document.getElementById("sparrow");

  shipSize = 100;

  resourceCount = 0;
  maxHealth = 200;
  health = 200;
  maxSpeed = 8;

  weapons = [new Ray()];
}

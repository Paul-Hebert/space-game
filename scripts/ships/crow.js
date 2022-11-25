import { BaseShip } from "./base.js";
import { DoubleGun } from "../weapons/double-gun.js";

export class CrowShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  size = 150;

  resourceCount = 0;
  maxShields = 200;
  health = 600;
  maxHealth = 600;
  health = 600;
  maxSpeed = 8;
  rotationSpeed = 1;
  accelerationSpeed = 0.25;

  weapons = [new DoubleGun()];
}

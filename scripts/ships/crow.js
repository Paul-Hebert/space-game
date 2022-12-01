import { BaseShip } from "./base.js";
import { DoubleGun } from "../weapons/double-gun.js";

export class CrowShip extends BaseShip {
  size = 150;

  health = 600;
  maxHealth = 600;

  maxSpeed = 8;
  rotationSpeed = 1;
  accelerationSpeed = 0.25;

  weapons = [new DoubleGun()];
}

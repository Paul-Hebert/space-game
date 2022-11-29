import { BaseShip } from "./base.js";
import { Pew } from "../weapons/pew.js";
import { Laser } from "../weapons/laser.js";

export class BigShip extends BaseShip {
  accelerationSpeed = 0.125;
  rotationSpeed = 1;

  size = 160;

  shields = 200;
  maxShields = 200;

  maxHealth = 400;
  health = 400;
  maxSpeed = 8;

  targetRange = {
    min: 400,
  };

  weapons = [new Pew(), new Laser()];
}

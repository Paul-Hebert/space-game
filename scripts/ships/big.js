import { BaseShip } from "./base.js";
import { Pew } from "../weapons/pew.js";
import { Laser } from "../weapons/laser.js";
import { randomInt } from "../math/random.js";

export class BigShip extends BaseShip {
  constructor(params) {
    super(params);
    this.currentGun = randomInt(0, this.weapons.length - 1);
  }

  accelerationSpeed = 0.125;
  rotationSpeed = 1;

  size = 160;

  shields = 200;
  maxShields = 200;

  maxHealth = 400;
  health = 400;
  maxSpeed = 8;

  weapons = [new Pew(), new Laser()];
}

import { BaseShip } from "./base.js";
import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { Boom } from "../weapons/boom.js";
import { randomInt } from "../math/random.js";

export class BigShip extends BaseShip {
  constructor(params) {
    super(params);
    this.currentGun = randomInt(0, this.weapons.length - 1);
  }

  accelerationSpeed = 0.25;
  rotationSpeed = 1;

  shipSize = 160;

  maxHealth = 400;
  health = 400;
  maxSpeed = 8;

  weapons = [new Pew(), new Laser()];
}

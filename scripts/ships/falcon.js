import { BaseShip } from "./base.js";
import { StasisLaser } from "../weapons/stasis-laser.js";
import { Laser } from "../weapons/laser.js";
import { Ray } from "../weapons/ray.js";
import { Pew } from "../weapons/pew.js";
import { Boom } from "../weapons/boom.js";

export class FalconShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  size = 150;

  resourceCount = 0;

  shields = 600;
  maxShields = 600;

  health = 1200;
  maxHealth = 1200;

  maxSpeed = 6;
  rotationSpeed = 2;
  accelerationSpeed = 0.25;

  weapons = [new Boom(), new Pew(), new StasisLaser(), new Laser()];
}

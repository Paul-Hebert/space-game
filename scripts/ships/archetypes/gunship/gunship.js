import { BaseShip } from "../../base.js";
import { StasisLaser } from "../../../weapons/stasis-laser.js";
import { Pew } from "../../../weapons/pew.js";
import { DoubleGun } from "../../../weapons/double-gun.js";
import { Bomb } from "../../../weapons/bomb.js";

export class GunShip extends BaseShip {
  size = 150;

  shields = 600;
  maxShields = 600;

  health = 300;
  maxHealth = 300;

  shieldRegenerationRate = 5;

  maxSpeed = 10;
  rotationSpeed = 2;
  accelerationSpeed = 1;

  shouldFlee() {
    return this.shields < this.maxShields / 3;
  }

  shouldStopFleeing() {
    return this.shields > (this.maxShields * 2) / 3;
  }

  weapons = [new Bomb(), new DoubleGun(), new Pew(), new StasisLaser()];
}

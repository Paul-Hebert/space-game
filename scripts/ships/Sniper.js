import { BaseShip } from "./base.js";
import { Laser } from "../weapons/laser.js";

export class SniperShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  graphic = document.getElementById("enemy-ship");

  shipSize = 200;

  resourceCount = 0;
  maxHealth = 600;
  health = 600;
  maxSpeed = 8;
  rotationSpeed = 0.5;
  accelerationSpeed = 0.125;

  weapons = [new Laser()];
}

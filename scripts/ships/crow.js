import { BaseShip } from "./base.js";
import { Pew } from "../weapons/pew.js";

export class CrowShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  graphic = document.getElementById("enemy-ship");

  shipSize = 150;

  resourceCount = 0;
  maxHealth = 600;
  health = 600;
  maxSpeed = 8;
  rotationSpeed = 1;
  accelerationSpeed = 0.25;

  weapons = [new Pew()];
}

import { BaseShip } from "./base.js";
import { StasisLaser } from "../weapons/stasis-laser.js";

export class MiningDrone extends BaseShip {
  constructor(params) {
    super(params);
    this.currentGun = 0;
  }

  rotationSpeed = 10;
  accelerationSpeed = 2;
  maxSpeed = 12;
  graphic = document.getElementById("ship-2");

  size = 80;

  maxHealth = 100;
  health = 100;

  maxResourceCount = 1;

  weapons = [new StasisLaser()];

  upgradeDropChance = 0;
}

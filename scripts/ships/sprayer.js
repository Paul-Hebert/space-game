import { BaseShip } from "./base.js";
import { randomInt } from "../math/random.js";
import { SprayBlaster } from "../weapons/spray-blaster.js";

export class SprayerShip extends BaseShip {
  constructor(params) {
    super(params);
    this.currentGun = randomInt(0, this.weapons.length - 1);
  }

  rotationSpeed = 5;
  accelerationSpeed = 1;
  maxSpeed = 15;
  graphic = document.getElementById("ship-3");

  size = 100;

  maxHealth = 200;
  health = 200;

  maxResourceCount = 2;

  weapons = [new SprayBlaster()];

  targetRange = { min: 0 };
}

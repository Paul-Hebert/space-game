import { BaseShip } from "./base.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { randomInt } from "../math/random.js";

export class FastShip extends BaseShip {
  constructor(params) {
    super(params);
    this.currentGun = randomInt(0, this.weapons.length - 1);
  }

  rotationSpeed = 5;
  accelerationSpeed = 1;
  maxSpeed = 15;
  graphic = document.getElementById("ship-3");

  size = 40;

  maxHealth = 50;
  health = 50;

  maxResourceCount = 1;

  weapons = [new BaseWeapon()];
}

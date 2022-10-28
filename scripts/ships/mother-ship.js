import { BaseShip } from "./base.js";
import { ShipSpawner } from "../weapons/ship-spawner.js";

export class MotherShip extends BaseShip {
  constructor(params) {
    super(params);
    this.currentGun = 0;
  }

  graphic = document.getElementById("ship-2");

  accelerationSpeed = 0.125;
  rotationSpeed = 1;

  size = 300;

  maxHealth = 1200;
  health = 1200;
  maxSpeed = 5;
  maxResourceCount = 5;

  weapons = [new ShipSpawner()];
}

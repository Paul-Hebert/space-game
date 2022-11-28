import { BaseShip } from "./base.js";
import { ShipSpawner } from "../weapons/ship-spawner.js";

export class MotherShip extends BaseShip {
  graphic = document.getElementById("ship-2");

  accelerationSpeed = 0.125;
  rotationSpeed = 1;

  size = 300;

  maxHealth = 1200;
  health = 1200;
  maxSpeed = 5;
  maxResourceCount = 5;

  upgradeDropChance = 0.5;
  upgradeIsWeaponChance = 0;

  weapons = [new ShipSpawner()];
}

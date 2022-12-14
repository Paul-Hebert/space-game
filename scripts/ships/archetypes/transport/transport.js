import { BaseShip } from "../../base.js";
import { ShipSpawner } from "../../../weapons/ship-spawner.js";

export class Transport extends BaseShip {
  graphic = document.getElementById("ship-2");

  accelerationSpeed = 0.125;
  rotationSpeed = 1;

  size = 300;

  maxHealth = 1200;
  health = 1200;
  maxSpeed = 6;
  maxResourceCount = 5;

  upgradeDropChance = 0.5;
  upgradeIsWeaponChance = 0;

  weapons = [new ShipSpawner()];

  targetRange = {
    min: 600,
    ideal: 800,
  };
}

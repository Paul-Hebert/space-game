import { BaseShip } from "../../base.js";
import { ShipSpawner } from "../../../weapons/ship-spawner.js";
import { Pew } from "../../../weapons/pew.js";

export class SpaceStation extends BaseShip {
  graphic = document.getElementById("space-station");

  accelerationSpeed = 0;
  maxSpeed = 0;
  rotationSpeed = 1;
  size = 300;

  shields = 400;
  maxShields = 400;
  maxHealth = 1200;
  health = 1200;
  maxSpeed = 10;
  maxResourceCount = 5;

  upgradeDropChance = 0.2;
  upgradeIsWeaponChance = 0;

  weapons = [new ShipSpawner(), new Pew()];

  targetRange = {
    min: 0,
  };
}

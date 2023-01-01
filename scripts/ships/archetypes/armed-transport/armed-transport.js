import { BaseShip } from "../../base.js";
import { ShipSpawner } from "../../../weapons/ship-spawner.js";
import { DoubleGun } from "../../../weapons/double-gun.js";
import { Pew } from "../../../weapons/pew.js";

export class ArmedTransport extends BaseShip {
  graphic = document.getElementById("ship-4");

  accelerationSpeed = 0.5;
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
    min: 300,
    ideal: 600,
  };
}

import { BaseShip } from "../../base.js";
import { MissileLauncher } from "../../../weapons/missile-launcher.js";

export class ArtilleryShip extends BaseShip {
  graphic = document.getElementById("ship-4");

  accelerationSpeed = 0.5;
  rotationSpeed = 1;

  size = 200;

  maxHealth = 1200;
  health = 1200;
  maxSpeed = 10;
  maxResourceCount = 5;

  upgradeDropChance = 0.2;
  upgradeIsWeaponChance = 0;

  weapons = [new MissileLauncher()];

  targetRange = {
    min: 800,
    ideal: 1000,
  };
}

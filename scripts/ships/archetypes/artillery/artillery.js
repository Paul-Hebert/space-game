import { BaseShip } from "../../base.js";
import { MissileLauncher } from "../../../weapons/missile-launcher.js";
import { Bomb } from "../../../weapons/bomb.js";

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

  weapons = [new MissileLauncher(), new Bomb()];

  targetRange = {
    min: 700,
    ideal: 1200,
  };
}

import { Laser } from "../../../weapons/laser.js";
import { BaseShip } from "../../base.js";

export class HunterShip extends BaseShip {
  graphic = document.getElementById("ship-5");

  size = 200;

  resourceCount = 0;
  maxHealth = 600;
  health = 600;
  maxSpeed = 10;
  rotationSpeed = 0.25;
  maxResourceCount = 5;
  accelerationSpeed = 0.25;

  weapons = [new Laser()];

  upgradeDropChance = 0.75;
  upgradeIsWeaponChance = 0.25;

  targetRange = {
    min: 600,
  };
}

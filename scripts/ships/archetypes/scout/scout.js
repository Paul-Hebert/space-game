import { BaseShip } from "../../base.js";
import { BaseWeapon } from "../../../weapons/base-weapon.js";

export class ScoutShip extends BaseShip {
  rotationSpeed = 5;
  accelerationSpeed = 1;
  maxSpeed = 15;
  graphic = document.getElementById("ship-3");

  size = 40;

  maxHealth = 50;
  health = 50;

  maxResourceCount = 1;

  weapons = [new BaseWeapon()];

  targetRange = {
    min: 200,
    ideal: 400,
  };

  upgradeDropChance = 0;
}

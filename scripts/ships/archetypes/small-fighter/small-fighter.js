import { Ray } from "../../../weapons/ray.js";
import { BaseShip } from "../../base.js";

export class SmallFighterShip extends BaseShip {
  rotationSpeed = 5;
  accelerationSpeed = 1;
  maxSpeed = 10;
  graphic = document.getElementById("ship-3");

  size = 100;

  maxHealth = 450;
  health = 450;

  weapons = [new Ray()];

  targetRange = {
    min: 200,
  };
}

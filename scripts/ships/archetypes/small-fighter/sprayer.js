import { SprayBlaster } from "../../../weapons/spray-blaster.js";

export class SmallFighterShip extends SmallFighterShip {
  rotationSpeed = 5;
  accelerationSpeed = 1;
  maxSpeed = 10;
  graphic = document.getElementById("ship-3");

  size = 150;

  maxHealth = 450;
  health = 450;

  weapons = [new SprayBlaster()];

  targetRange = {
    min: 0,
  };
}

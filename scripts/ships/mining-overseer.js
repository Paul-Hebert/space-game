import { DroneSpawner } from "../weapons/drone-spawner.js";
import { MotherShip } from "./mother-ship.js";

export class MiningOverseer extends MotherShip {
  constructor(params) {
    super(params);
    this.currentGun = 0;
  }

  graphic = document.getElementById("ship-2");

  accelerationSpeed = 0.125;
  rotationSpeed = 1;

  size = 400;

  maxHealth = 1500;

  weapons = [new DroneSpawner()];

  upgradeDropChance = 0.75;
}

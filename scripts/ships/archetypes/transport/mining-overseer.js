import { DroneSpawner } from "../../../weapons/drone-spawner.js";
import { Transport } from "./transport.js";

export class MiningOverseer extends Transport {
  graphic = document.getElementById("ship-2");

  accelerationSpeed = 0.125;
  rotationSpeed = 1;

  size = 400;

  shields = 1000;
  maxShields = 1000;

  health = 1000;
  maxHealth = 1000;

  weapons = [new DroneSpawner()];

  upgradeDropChance = 0.75;
}

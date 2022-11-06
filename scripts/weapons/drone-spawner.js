import { MiningDrone } from "../ships/mining-drone.js";
import { ShipSpawner } from "./ship-spawner.js";

export class DroneSpawner extends ShipSpawner {
  speed = 100;
  reloadSpeed = 100;

  spawnedShip = MiningDrone;
}

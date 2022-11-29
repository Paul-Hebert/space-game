import { PestShip } from "../ships/archetypes/pest/pest.js";
import { ShipSpawner } from "./ship-spawner.js";

export class DroneSpawner extends ShipSpawner {
  speed = 100;
  reloadSpeed = 100;

  spawnedShip = PestShip;
}

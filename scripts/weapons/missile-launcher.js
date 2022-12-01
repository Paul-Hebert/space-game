import { Missile } from "../ships/missile.js";
import { ShipSpawner } from "./ship-spawner.js";

export class MissileLauncher extends ShipSpawner {
  speed = 100;
  reloadSpeed = 100;

  spawnedShip = Missile;

  range() {
    return 1600;
  }
}

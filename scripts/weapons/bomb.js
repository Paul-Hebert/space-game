import { ShipSpawner } from "./ship-spawner.js";
import { Bomb as BombShip } from "../ships/bomb.js";

export class Bomb extends ShipSpawner {
  name = "Explosive Space Mines";
  description = "Drop one of these when you're being chased.";

  speed = 0;
  age = 0;
  maxAge = 100;

  reloadSpeed = 50;

  type = "bomb";

  spawnedShip = BombShip;
}

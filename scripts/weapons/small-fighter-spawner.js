import { SmallFighterShip } from "../ships/archetypes/small-fighter/small-fighter.js";
import { ShipSpawner } from "./ship-spawner.js";

export class SmallFighterSpawner extends ShipSpawner {
  speed = 100;
  reloadSpeed = 100;

  spawnedShip = SmallFighterShip;
}

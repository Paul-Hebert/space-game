import { BaseShip } from "../ships/base.js";
import { BigShip } from "../ships/big.js";
import { ScoutShip } from "../ships/archetypes/scout/scout.js";
import { playerState } from "../state/player-state.js";
import { randomBool, randomItemInArray } from "../math/random.js";
import { mapSize } from "../map-size.js";
import { mapData } from "../state/map-data.js";

export function addRandomShip() {
  const pos = {
    x: playerState.x + mapSize * (randomBool(0.5) ? 1 : -1),
    y: playerState.y + mapSize * (randomBool(0.5) ? 1 : -1),
  };

  const shipOptions = [new BaseShip(pos), new BigShip(pos), new ScoutShip(pos)];

  mapData.ships.push(randomItemInArray(shipOptions));
}

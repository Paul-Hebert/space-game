import { addMessageToQueue } from "../hud/messaging.js";
import { SparrowShip } from "../ships/sparrow.js";
import { mapData } from "../state/map-data.js";
import { CrowShip } from "../ships/crow.js";
import { ScoutShip } from "../ships/archetypes/scout/scout.js";
import { HunterShip } from "../ships/archetypes/hunter/hunter.js";
import { BigShip } from "../ships/big.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapBottom,
  positionToMapLeft,
  positionToMapRight,
  positionToMapTop,
} from "../math/position-to-map-edge.js";
import { battleObjective } from "./objectives/battle.js";
import { FalconShip } from "../ships/falcon.js";

export function level1() {
  for (let i = 0; i < 5; i++) {
    mapData.ships.push(new SparrowShip(positionToMapRight()));
  }

  for (let i = 0; i < 12; i++) {
    mapData.ships.push(new ScoutShip(positionToMapLeft()));
  }

  mapData.ships.push(new CrowShip(positionToMapLeft()));

  mapData.ships.push(new HunterShip(positionToMapBottom()));

  mapData.ships.push(new FalconShip(positionToMapTop()));

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!.</p>
    `,
    theme: "danger",
    objectives: [battleObjective()],

    nextAction: () => {
      completeLevel();
    },
  });
}

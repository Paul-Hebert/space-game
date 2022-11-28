import { addMessageToQueue } from "../hud/messaging.js";
import { SparrowShip } from "../ships/sparrow.js";
import { mapData } from "../state/map-data.js";
import { FastShip } from "../ships/fast.js";
import { HunterShip } from "../ships/archetypes/hunter/hunter.js";
import { BigShip } from "../ships/big.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapBottom,
  positionToMapLeft,
  positionToMapRight,
  positionToMapTop,
} from "../math/position-to-map-edge.js";
import { MotherShip } from "../ships/mother-ship.js";
import { MiningOverseer } from "../ships/mining-overseer.js";
import { battleObjective } from "./objectives/battle.js";
import { FalconShip } from "../ships/falcon.js";

export function level5() {
  for (let i = 0; i < 2; i++) {
    mapData.ships.push(new MotherShip(positionToMapLeft()));
    mapData.ships.push(new MiningOverseer(positionToMapRight()));
  }

  mapData.ships.push(new FalconShip(positionToMapTop()));
  mapData.ships.push(new FalconShip(positionToMapBottom()));

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

import { addMessageToQueue } from "../hud/messaging.js";
import { SparrowShip } from "../ships/sparrow.js";
import { mapData } from "../state/map-data.js";
import { CrowShip } from "../ships/crow.js";
import { FastShip } from "../ships/fast.js";
import { SniperShip } from "../ships/Sniper.js";
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
    mapData.ships.push(new FastShip(positionToMapLeft()));
  }

  mapData.ships.push(new CrowShip(positionToMapLeft()));

  mapData.ships.push(new SniperShip(positionToMapBottom()));

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

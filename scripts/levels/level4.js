import { addMessageToQueue } from "../hud/messaging.js";
import { SparrowShip } from "../ships/sparrow.js";
import { mapData } from "../state/map-data.js";
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

export function level4() {
  for (let i = 0; i < 3; i++) {
    mapData.ships.push(new SparrowShip(positionToMapBottom()));
  }

  for (let i = 0; i < 10; i++) {
    mapData.ships.push(new FastShip(positionToMapLeft()));
  }

  mapData.ships.push(new SniperShip(positionToMapTop()));

  mapData.ships.push(new BigShip(positionToMapRight()));

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

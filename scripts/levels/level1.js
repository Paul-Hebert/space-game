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

export function level1() {
  for (let i = 0; i < 5; i++) {
    mapData.ships.push(new SparrowShip(positionToMapRight()));
  }

  for (let i = 0; i < 12; i++) {
    mapData.ships.push(new FastShip(positionToMapLeft()));
  }

  mapData.ships.push(new CrowShip(positionToMapLeft()));

  mapData.ships.push(new SniperShip(positionToMapBottom()));

  mapData.ships.push(new BigShip(positionToMapTop()));

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!.</p>
      <div class="objective">0/20 ships destroyed.</div>
    `,

    updateObjective: () => {
      return `${20 - mapData.ships.length}/20 ships destroyed.`;
    },

    exitRequirements: () => {
      return mapData.ships.length === 0;
    },

    nextAction: () => {
      completeLevel();
    },
  });
}

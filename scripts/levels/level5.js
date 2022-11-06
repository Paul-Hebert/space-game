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
import { MotherShip } from "../ships/mother-ship.js";
import { MiningOverseer } from "../ships/mining-overseer.js";

export function level5() {
  for (let i = 0; i < 3; i++) {
    mapData.ships.push(new MotherShip(positionToMapLeft()));
    mapData.ships.push(new MiningOverseer(positionToMapRight()));
  }

  mapData.ships.push(new SniperShip(positionToMapTop()));
  mapData.ships.push(new SniperShip(positionToMapBottom()));

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!.</p>
      <div class="objective">6 ships remaining.</div>
    `,

    updateObjective: () => {
      return `${mapData.ships.length} ships remaining.`;
    },

    exitRequirements: () => {
      return mapData.ships.length === 0;
    },

    nextAction: () => {
      completeLevel();
    },
  });
}

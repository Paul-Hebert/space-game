import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapRight,
  positionToMapTop,
  positionToMapLeft,
  positionToMapBottom,
} from "../math/position-to-map-edge.js";
import { MotherShip } from "../ships/mother-ship.js";

export function level3() {
  mapData.ships.push(new MotherShip(positionToMapRight(0.5)));
  mapData.ships.push(new MotherShip(positionToMapTop(0.5)));
  mapData.ships.push(new MotherShip(positionToMapLeft(0.5)));
  mapData.ships.push(new MotherShip(positionToMapBottom(0.5)));

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!.</p>
      <div class="objective">4 Ships Remaining.</div>
    `,

    updateObjective: () => {
      console.log(mapData.ships);
      return `${mapData.ships.length} Ships Remaining`;
    },

    exitRequirements: () => {
      return mapData.ships.length === 0;
    },

    nextAction: () => {
      completeLevel();
    },
  });
}

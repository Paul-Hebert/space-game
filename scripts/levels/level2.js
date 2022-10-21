import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { completeLevel } from "./levels.js";
import { positionToMapRight } from "../math/position-to-map-edge.js";
import { MotherShip } from "../ships/mother-ship.js";

export function level2() {
  mapData.ships.push(new MotherShip(positionToMapRight(0.5)));

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!.</p>
      <div class="objective">1 Ship Remaining.</div>
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

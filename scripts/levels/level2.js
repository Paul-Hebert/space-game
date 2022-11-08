import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { completeLevel } from "./levels.js";
import { positionToMapRight } from "../math/position-to-map-edge.js";
import { MotherShip } from "../ships/mother-ship.js";
import { battleObjective } from "./objectives/battle.js";

export function level2() {
  mapData.ships.push(new MotherShip(positionToMapRight(0.5)));

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!.</p>
    `,

    objectives: [battleObjective()],

    nextAction: () => {
      completeLevel();
    },
  });
}

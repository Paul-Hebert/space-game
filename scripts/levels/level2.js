import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { completeLevel } from "./levels.js";
import { positionToMapRight } from "../math/position-to-map-edge.js";
import { Transport } from "../ships/archetypes/transport/transport.js";
import { battleObjective } from "./objectives/battle.js";

export function level2() {
  mapData.ships.push(new Transport(positionToMapRight(0.5)));

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

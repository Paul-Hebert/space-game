import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapRight,
  positionToMapTop,
  positionToMapLeft,
  positionToMapBottom,
} from "../math/position-to-map-edge.js";
import { Transport } from "../ships/archetypes/transport/transport.js";
import { MiningOverseer } from "../ships/mining-overseer.js";
import { battleObjective } from "./objectives/battle.js";

export function level3() {
  mapData.ships.push(new MiningOverseer(positionToMapRight(0.5)));
  mapData.ships.push(new Transport(positionToMapTop(0.5)));
  mapData.ships.push(new MiningOverseer(positionToMapLeft(0.5)));
  mapData.ships.push(new Transport(positionToMapBottom(0.5)));

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

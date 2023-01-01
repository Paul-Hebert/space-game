import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapBottom,
  positionToMapLeft,
  positionToMapRight,
  positionToMapTop,
} from "../math/position-to-map-edge.js";
import { Transport } from "../ships/archetypes/transport/transport.js";
import { MiningOverseer } from "../ships/archetypes/transport/mining-overseer.js";
import { battleObjective } from "./objectives/battle.js";
import { FalconShip } from "../ships/archetypes/gunship/falcon.js";
import { Commander } from "../ships/archetypes/commander/commander.js";

export function level5() {
  for (let i = 0; i < 2; i++) {
    mapData.ships.push(new Transport(positionToMapLeft()));
    mapData.ships.push(new MiningOverseer(positionToMapRight()));
  }

  mapData.ships.push(new FalconShip(positionToMapTop()));
  mapData.ships.push(new Commander(positionToMapBottom()));

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

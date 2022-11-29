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
import { MiningOverseer } from "../ships/mining-overseer.js";
import { battleObjective } from "./objectives/battle.js";
import { ScoutShip } from "../ships/archetypes/scout/scout.js";
import { PestShip } from "../ships/archetypes/pest/pest.js";
import { HunterShip } from "../ships/archetypes/hunter/hunter.js";

export function debugLevel() {
  // Anything goes!
  for (let i = 0; i < 5; i++) {
    // mapData.ships.push(new ScoutShip(positionToMapRight()));
    // mapData.ships.push(new PestShip(positionToMapRight()));
    mapData.ships.push(new HunterShip(positionToMapRight()));
  }

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

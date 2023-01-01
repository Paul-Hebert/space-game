import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { ScoutShip } from "../ships/archetypes/scout/scout.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapLeft,
  positionToMapRight,
  positionToMapTop,
} from "../math/position-to-map-edge.js";
import { battleObjective } from "./objectives/battle.js";
import { SmallFighterShip } from "../ships/archetypes/small-fighter/small-fighter.js";
import { Transport } from "../ships/archetypes/transport/transport.js";

export function level1() {
  for (let i = 0; i < 3; i++) {
    mapData.ships.push(new SmallFighterShip(positionToMapRight()));
  }

  for (let i = 0; i < 10; i++) {
    mapData.ships.push(new ScoutShip(positionToMapLeft()));
  }

  mapData.ships.push(new Transport(positionToMapTop()));

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

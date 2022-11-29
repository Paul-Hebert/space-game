import { MotherShip } from "../../ships/mother-ship.js";
import { HunterShip } from "../../ships/archetypes/hunter/hunter.js";
import { CrowShip } from "../../ships/crow.js";
import { ScoutShip } from "../../ships/archetypes/scout/scout.js";
import { BigShip } from "../../ships/big.js";
import { SparrowShip } from "../../ships/sparrow.js";
import { randomItemInArray, shuffle } from "../../math/random.js";
import { mapData } from "../../state/map-data.js";
import { positionToRandomMapEdge } from "../../math/position-to-map-edge.js";
import { addMessageToQueue } from "../../hud/messaging.js";
import { completeLevel } from "../levels.js";
import { PestShip } from "../../ships/archetypes/pest/pest.js";
import { MiningOverseer } from "../../ships/mining-overseer.js";
import { battleObjective } from "../objectives/battle.js";
import { SprayerShip } from "../../ships/sprayer.js";
import { FalconShip } from "../../ships/falcon.js";

// TODO: Clusters of enemies
const enemyOptions = [
  {
    difficulty: 20,
    options: [FalconShip],
  },
  {
    difficulty: 10,
    options: [MotherShip, HunterShip, BigShip, MiningOverseer],
  },
  {
    difficulty: 4,
    options: [SprayerShip, SparrowShip, CrowShip],
  },
  {
    difficulty: 1,
    options: [ScoutShip, PestShip],
  },
];

export function fightLevel({ difficulty = 5 }) {
  let currentDifficulty = 0;

  while (currentDifficulty < difficulty) {
    const groups = shuffle(enemyOptions);
    for (const group of groups) {
      if (difficulty - currentDifficulty >= group.difficulty) {
        const shipType = randomItemInArray(group.options);
        // TODO: Randomize side/location
        mapData.ships.push(new shipType(positionToRandomMapEdge()));

        currentDifficulty += group.difficulty;
        break;
      }
    }
  }

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!</p>
    `,
    theme: "danger",
    objectives: [battleObjective()],

    nextAction: () => {
      completeLevel();
    },
  });
}

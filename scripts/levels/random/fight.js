import { MotherShip } from "../../ships/mother-ship.js";
import { SniperShip } from "../../ships/Sniper.js";
import { CrowShip } from "../../ships/crow.js";
import { FastShip } from "../../ships/fast.js";
import { BaseShip } from "../../ships/base.js";
import { BigShip } from "../../ships/big.js";
import { SparrowShip } from "../../ships/sparrow.js";
import { randomItemInArray, shuffle } from "../../math/random.js";
import { mapData } from "../../state/map-data.js";
import { positionToRandomMapEdge } from "../../math/position-to-map-edge.js";
import { addMessageToQueue } from "../../hud/messaging.js";
import { completeLevel } from "../levels.js";
import { MiningDrone } from "../../ships/mining-drone.js";
import { MiningOverseer } from "../../ships/mining-overseer.js";
import { battleObjective } from "../objectives/battle.js";

// TODO: Clusters of enemies
const enemyOptions = [
  {
    difficulty: 10,
    options: [MotherShip, SniperShip, BigShip, MiningOverseer],
  },
  {
    difficulty: 3,
    options: [SparrowShip, BaseShip, CrowShip],
  },
  {
    difficulty: 1,
    options: [FastShip, MiningDrone],
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

    objectives: [battleObjective()],

    nextAction: () => {
      completeLevel();
    },
  });
}

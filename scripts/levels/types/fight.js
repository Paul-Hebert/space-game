import { Transport } from "../../ships/archetypes/transport/transport.js";
import { HunterShip } from "../../ships/archetypes/hunter/hunter.js";
import { ScoutShip } from "../../ships/archetypes/scout/scout.js";
import { randomItemInArray, shuffle } from "../../math/random.js";
import { mapData } from "../../state/map-data.js";
import { positionToRandomMapEdge } from "../../math/position-to-map-edge.js";
import { addMessageToQueue } from "../../hud/messaging.js";
import { completeLevel } from "../levels.js";
import { PestShip } from "../../ships/archetypes/pest/pest.js";
import { battleObjective } from "../objectives/battle.js";
import { FalconShip } from "../../ships/archetypes/gunship/falcon.js";
import { ArmedTransport } from "../../ships/archetypes/armed-transport/armed-transport.js";
import { ArtilleryShip } from "../../ships/archetypes/artillery/artillery.js";
import { Commander } from "../../ships/archetypes/commander/commander.js";
import { GunShip } from "../../ships/archetypes/gunship/gunship.js";
import { SmallFighterShip } from "../../ships/archetypes/small-fighter/small-fighter.js";
import { SpaceStation } from "../../ships/archetypes/space-station/space-station.js";

// TODO: Clusters of enemies
const enemyOptions = [
  {
    difficulty: 20,
    options: [FalconShip, Commander],
  },
  {
    difficulty: 15,
    options: [ArmedTransport, ArtilleryShip, GunShip],
  },
  {
    difficulty: 10,
    options: [Transport, HunterShip, SpaceStation],
  },
  {
    difficulty: 4,
    options: [SmallFighterShip],
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

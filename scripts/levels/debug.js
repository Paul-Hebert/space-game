import { addMessageToQueue } from "../hud/messaging.js";
import { mapData } from "../state/map-data.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapRight,
  positionToMapTop,
  positionToMapLeft,
  positionToMapBottom,
  positionToRandomMapEdge,
  randomMapEdgeFunction,
} from "../math/position-to-map-edge.js";
import { Transport } from "../ships/archetypes/transport/transport.js";
import { battleObjective } from "./objectives/battle.js";
import { ScoutShip } from "../ships/archetypes/scout/scout.js";
import { PestShip } from "../ships/archetypes/pest/pest.js";
import { HunterShip } from "../ships/archetypes/hunter/hunter.js";
import { ArmedTransport } from "../ships/archetypes/armed-transpot/armed-transport.js";
import { GunShip } from "../ships/archetypes/gunship/gunship.js";
import { playerState } from "../state/player-state.js";
import { DoubleGun } from "../weapons/double-gun.js";
import { Laser } from "../weapons/laser.js";
import { Boom } from "../weapons/boom.js";
import { updateWeapons } from "../hud/update-weapons.js";
import { showShieldBar } from "../hud/update-shield-bar.js";
import { random } from "../math/random.js";
import { MiningOverseer } from "../ships/mining-overseer.js";
import { FalconShip } from "../ships/falcon.js";
import { Commander } from "../ships/archetypes/commander/commander.js";

export function debugLevel() {
  playerState.shields = 600;
  playerState.maxShields = 600;
  playerState.weapons = [new DoubleGun(), new Laser(), new Boom()];
  updateWeapons();
  showShieldBar();

  // Anything goes!
  // for (let i = 0; i < 10; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new ScoutShip(edgeFunction(randomDistance)));
  // }
  // for (let i = 0; i < 5; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new PestShip(edgeFunction(randomDistance)));
  // }
  // for (let i = 0; i < 3; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new HunterShip(edgeFunction(randomDistance)));
  // }
  // for (let i = 0; i < 2; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new GunShip(edgeFunction(randomDistance)));
  // }
  // for (let i = 0; i < 1; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new Transport(edgeFunction(randomDistance)));
  // }
  // for (let i = 0; i < 1; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new MiningOverseer(edgeFunction(randomDistance)));
  // }
  // for (let i = 0; i < 1; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new FalconShip(edgeFunction(randomDistance)));
  // }
  // for (let i = 0; i < 1; i++) {
  //   const edgeFunction = randomMapEdgeFunction();
  //   const randomDistance = random(1, 8);
  //   mapData.ships.push(new ArmedTransport(edgeFunction(randomDistance)));
  // }
  for (let i = 0; i < 1; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new Commander(edgeFunction(1)));
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

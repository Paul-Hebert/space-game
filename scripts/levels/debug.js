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
import { ArmedTransport } from "../ships/archetypes/armed-transport/armed-transport.js";
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
import { Pew } from "../weapons/pew.js";
import { StasisLaser } from "../weapons/stasis-laser.js";
import { SprayBlaster } from "../weapons/spray-blaster.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { Ray } from "../weapons/ray.js";
import { RepeatLaser } from "../weapons/repeat-laser.js";
import { ArtilleryShip } from "../ships/archetypes/artillery/artillery.js";
import { SpaceStation } from "../ships/archetypes/space-station/space-station.js";
import { Bomb } from "../weapons/bomb.js";

export function debugLevel() {
  playerState.shields = 600;
  playerState.maxShields = 600;
  playerState.weapons = [
    new DoubleGun(),
    new Bomb(),
    new Laser(),
    new Boom(),
    new Pew(),
    new StasisLaser(),
    new SprayBlaster(),
    new BaseWeapon(),
    new Ray(),
    new RepeatLaser(),
  ];
  updateWeapons();
  showShieldBar();

  // Anything goes!
  for (let i = 0; i < 30; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new ScoutShip(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 10; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new PestShip(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 3; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new HunterShip(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 2; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new GunShip(edgeFunction(1)));
  }
  for (let i = 0; i < 1; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new Transport(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 1; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new MiningOverseer(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 1; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new FalconShip(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 1; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new ArmedTransport(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 1; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new Commander(edgeFunction(randomDistance)));
  }
  for (let i = 0; i < 2; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new SpaceStation(edgeFunction(1)));
  }
  for (let i = 0; i < 1; i++) {
    const edgeFunction = randomMapEdgeFunction();
    const randomDistance = random(1, 8);
    mapData.ships.push(new ArtilleryShip(edgeFunction(1)));
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

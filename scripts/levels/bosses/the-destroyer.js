import { addMessageToQueue } from "../../hud/messaging.js";
import { positionToMapRight } from "../../math/position-to-map-edge.js";
import { BaseShip } from "../../ships/base.js";
import { playerState } from "../../state/player-state.js";
import { InitialShieldUpgrade } from "../../upgrades/initial-shield-upgrade.js";
import { ShipSpawner } from "../../weapons/ship-spawner.js";
import { SprayBlaster } from "../../weapons/spray-blaster.js";
import { completeLevel } from "../levels.js";
import { boss } from "../types/boss.js";

export function theDestroyer() {
  const specialSpawner = new ShipSpawner();
  specialSpawner.reloadSpeed = 20;

  class TheDestroyer extends BaseShip {
    health = 800;
    maxHealth = 800;
    shields = 800;
    maxShields = 800;
    size = 150;

    weapons = [specialSpawner, new SprayBlaster()];

    shouldFlee() {
      return this.shields < 200;
    }

    shouldStopFleeing() {
      return this.shields > 400 || this.distanceToPlayer() > 1000;
    }

    hardCodedUpgrade = {
      type: "ship-upgrade",
      upgradeDetails: new InitialShieldUpgrade(),
    };
  }

  boss({
    ship: new TheDestroyer(positionToMapRight()),
    heading: "Defeat the Destroyer",
    nextAction: () => {
      addMessageToQueue({
        content: `
          <p>
            The enemy ship dropped a shield! We can use that to upgrade our ship.
          </p>
        `,
        objectives: [
          {
            text: "Fly over the white circle to pick up the shield.",
            evaluate: () => playerState.maxShields > 0,
          },
        ],
        nextAction: () => {
          completeLevel();
        },
      });
    },
  });
}

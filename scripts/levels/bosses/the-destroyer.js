import { addMessageToQueue } from "../../hud/messaging.js";
import { positionToMapRight } from "../../math/position-to-map-edge.js";
import { BaseShip } from "../../ships/base.js";
import { mapData } from "../../state/map-data.js";
import { playerState } from "../../state/player-state.js";
import { InitialShieldUpgrade } from "../../upgrades/initial-shield-upgrade.js";
import { DroneSpawner } from "../../weapons/drone-spawner.js";
import { Laser } from "../../weapons/laser.js";
import { Pew } from "../../weapons/pew.js";
import { ShipSpawner } from "../../weapons/ship-spawner.js";
import { SprayBlaster } from "../../weapons/spray-blaster.js";
import { completeLevel } from "../levels.js";
import { boss } from "../types/boss.js";

export function theDestroyer() {
  const specialSpawner = new ShipSpawner();
  specialSpawner.reloadSpeed = 10;

  class TheDestroyer extends BaseShip {
    health = 800;
    maxHealth = 800;
    shields = 800;
    maxShields = 800;
    size = 150;

    weapons = [specialSpawner, new SprayBlaster()];

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

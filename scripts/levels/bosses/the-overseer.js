import { addMessageToQueue } from "../../hud/messaging.js";
import { positionToMapRight } from "../../math/position-to-map-edge.js";
import { BaseShip } from "../../ships/base.js";
import { playerState } from "../../state/player-state.js";
import { InitialShieldUpgrade } from "../../upgrades/initial-shield-upgrade.js";
import { Pew } from "../../weapons/pew.js";
import { SprayBlaster } from "../../weapons/spray-blaster.js";
import { completeLevel } from "../levels.js";
import { boss } from "../types/boss.js";

export function theOverseer() {
  const theOverseer = new BaseShip(positionToMapRight());
  theOverseer.health = 400;
  theOverseer.maxHealth = 400;
  theOverseer.shields = 400;
  theOverseer.maxShields = 400;
  theOverseer.size = 200;

  theOverseer.weapons = [new Pew(), new SprayBlaster()];

  theOverseer.hardCodedUpgrade = {
    type: "ship-upgrade",
    upgradeDetails: new InitialShieldUpgrade(),
  };

  boss({
    ship: theOverseer,
    heading: "Defeat the Overseer",
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

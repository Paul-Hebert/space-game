import { addMessageToQueue } from "../hud/messaging.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { keysThatHaveBeenPressed, resetPressedKeys } from "../pressed-keys.js";
import { SparrowShip } from "../ships/sparrow.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { CrowShip } from "../ships/crow.js";
import { FastShip } from "../ships/fast.js";
import { DoubleGun } from "../weapons/double-gun.js";
import { SniperShip } from "../ships/Sniper.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapRight,
  positionToMapLeft,
  positionToMapTop,
} from "../math/position-to-map-edge.js";

export function tutorial() {
  playerState.health = playerState.maxHealth - 100;
  updateHealthBar();

  addMessageToQueue({
    content: `
      <p>We took some damage back there captain. Shoot an asteroid so we can gather resources to repair the ship.</p>

      <ul>
        <li>Use the arrow keys to fly your ship</li>
        <li>Hold <kbd>Spacebar</kbd> to shoot</li>
        <li>Destroy asteroids and gather resources. Green resources repair the ship. Yellow resources can be used for upgrades.</li>
      </ul>
    `,
    exitRequirements: () => {
      return playerState.health === playerState.maxHealth;
    },
    nextAction: () => {
      for (let i = 0; i < 2; i++) {
        mapData.ships.push(new SparrowShip(positionToMapLeft()));
      }

      mapData.ships.push(new CrowShip(positionToMapRight()));

      addMessageToQueue({
        content: `
          <p>
            Alright, our ship's been repaired but it sounds like 
            trouble's on the way. We're under attack! 
            Shoot down those enemy ships!
          </p>

          <div class="objective">0/3 ships destroyed.</div>
        `,
        updateObjective: () => {
          return `${3 - mapData.ships.length}/3 ships destroyed.`;
        },
        exitRequirements: () => {
          return mapData.ships.length === 0;
        },
        nextAction: () => {
          resetPressedKeys();

          playerState.weapons.push(new DoubleGun());

          addMessageToQueue({
            content: `
              <p>
                We recovered a weapon from one of the destroyed ships. Let's give it a try.
              </p>

              <p>Press <kbd>Shift</kbd> to switch between weapons and try shooting it.</p>
            `,
            exitRequirements: () => {
              const hasSwitched = keysThatHaveBeenPressed.includes("Shift");

              const hasShot =
                mapData.bullets.filter((b) => b.weapon === "double-gun")
                  .length > 1;

              return hasSwitched && hasShot;
            },
            nextAction: () => {
              for (let i = 0; i < 6; i++) {
                mapData.ships.push(new FastShip(positionToMapRight()));
              }

              for (let i = 0; i < 3; i++) {
                mapData.ships.push(new SparrowShip(positionToMapLeft()));
              }

              mapData.ships.push(new SniperShip(positionToMapTop()));

              addMessageToQueue({
                content: `
                          <p>Uh oh, reinforcements are on the way.</p>
                          <div class="objective">0/10 ships destroyed.</div>
                        `,

                updateObjective: () => {
                  return `${10 - mapData.ships.length}/10 ships destroyed.`;
                },

                exitRequirements: () => {
                  return mapData.ships.length === 0;
                },

                nextAction: () => {
                  completeLevel();
                },
              });
            },
          });
        },
      });
    },
  });
}

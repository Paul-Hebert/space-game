import { addMessageToQueue } from "../hud/messaging.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { resetPressedKeys } from "../state/pressed-keys.js";
import { SparrowShip } from "../ships/sparrow.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { CrowShip } from "../ships/crow.js";
import { FastShip } from "../ships/fast.js";
import { DoubleGun } from "../weapons/double-gun.js";
import { Pew } from "../weapons/pew.js";
import { completeLevel } from "./levels.js";
import {
  positionToMapRight,
  positionToMapLeft,
} from "../math/position-to-map-edge.js";
import { randomItemInArray } from "../math/random.js";
import { controlOption } from "../state/control-option.js";

export function tutorial() {
  playerState.health = playerState.maxHealth - 100;
  updateHealthBar();

  const firstWeaponUpgrade = randomItemInArray([new DoubleGun(), new Pew()]);

  addMessageToQueue({
    content: `
      <p>We took some damage back there captain. Shoot an asteroid so we can gather resources to repair the ship.</p>

      <ul>
        ${
          controlOption === "keyboard"
            ? `
              <li>Use the arrow keys to fly your ship</li>
              <li>Press the <kbd>a</kbd> button to accelerate</li>
              <li>Hold <kbd>Spacebar</kbd> to shoot</li>
              `
            : `
              <li>Move the mouse to rotate your ship</li>
              <li>Press the <kbd>a</kbd> button to accelerate</li>
              <li>Hold the <kbd>s</kbd> button to shoot</li>
              `
        }

        <li>Destroy asteroids and gather resources to repair your ship.</li>
      </ul>
    `,
    exitRequirements: () => {
      return playerState.health === playerState.maxHealth;
    },
    nextAction: () => {
      const enemyShip = new CrowShip(positionToMapRight());
      enemyShip.weapons = [firstWeaponUpgrade];
      enemyShip.upgradeDropChance = 1;
      mapData.ships.push(enemyShip);

      addMessageToQueue({
        content: `
          <p>
            We're under attack! Shoot down the enemy ship!
          </p>

          <div class="objective">0/1 ship destroyed.</div>
        `,
        updateObjective: () => {
          return `${1 - mapData.ships.length}/1 ships destroyed.`;
        },
        exitRequirements: () => {
          return mapData.ships.length === 0;
        },
        nextAction: () => {
          resetPressedKeys();

          addMessageToQueue({
            content: `
              <p>
                The enemy ship dropped its weapon! Let's pick it up and try it out.
              </p>

              <p>
                Fly over the white circle to pick up the gun.
              </p>

              <p>Press the <kbd>${
                controlOption === "keyboard" ? "Shift" : "d"
              }</kbd> key to switch between weapons and try shooting it.</p>
            `,
            exitRequirements: () => {
              const hasShot =
                mapData.bullets.filter(
                  (b) => b.weapon === firstWeaponUpgrade.name
                ).length > 1;

              return hasShot;
            },
            nextAction: () => {
              for (let i = 0; i < 7; i++) {
                mapData.ships.push(new FastShip(positionToMapRight()));
              }

              for (let i = 0; i < 3; i++) {
                mapData.ships.push(new SparrowShip(positionToMapLeft()));
              }

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

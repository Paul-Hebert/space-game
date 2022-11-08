import { addMessageToQueue } from "../hud/messaging.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import {
  keysThatHaveBeenPressed,
  pressedKeys,
  resetPressedKeys,
} from "../state/pressed-keys.js";
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
import { pointerPosition } from "../state/pointer-position.js";
import { battleObjective } from "./objectives/battle.js";

export function tutorial() {
  playerState.health = playerState.maxHealth - 100;
  updateHealthBar();

  const firstWeaponUpgrade = randomItemInArray([new DoubleGun(), new Pew()]);

  let startingObjectives;

  if (controlOption === "keyboard") {
    startingObjectives = [
      {
        text: "Use the arrow keys to fly your ship.",
        evaluate: () =>
          keysThatHaveBeenPressed.includes("ArrowLeft") &&
          keysThatHaveBeenPressed.includes("ArrowRight") &&
          keysThatHaveBeenPressed.includes("ArrowUp"),
      },
      {
        text: "Hold <kbd>Spacebar</kbd> to shoot",
        evaluate: () => keysThatHaveBeenPressed.includes(" "),
      },
    ];
  } else {
    startingObjectives = [
      {
        text: "Move the mouse to rotate your ship.",
        evaluate: () => pointerPosition !== null,
      },
      {
        text: "Press the <kbd>a</kbd> key to accelerate.",
        evaluate: () =>
          keysThatHaveBeenPressed.includes("a") ||
          keysThatHaveBeenPressed.includes("A"),
      },
      {
        text: "Hold <kbd>s</kbd> to shoot",
        evaluate: () =>
          keysThatHaveBeenPressed.includes("s") ||
          keysThatHaveBeenPressed.includes("S"),
      },
    ];
  }

  startingObjectives.push({
    text: "Destroy asteroids and gather resources to repair your ship.",
    evaluate: () => playerState.health === playerState.maxHealth,
  });

  addMessageToQueue({
    content: `
      <p>
        Your ship is damaged. 
        Shoot an asteroid and gather resources from it to repair the ship.
      </p>
    `,
    objectives: startingObjectives,
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
        `,
        objectives: [battleObjective()],

        nextAction: () => {
          addMessageToQueue({
            content: `
              <p>
                The enemy ship dropped its weapon! Let's pick it up and try it out.
              </p>
            `,
            objectives: [
              {
                text: "Fly over the white circle to pick up the gun.",
                evaluate: () => playerState.weapons.length > 1,
                completionAction: resetPressedKeys,
              },
              {
                text: `Press the <kbd>${
                  controlOption === "keyboard" ? "Shift" : "d"
                }</kbd> key to switch weapons.`,
                evaluate: gunWasSwitched,
              },
              {
                text: `Try shooting it`,
                evaluate: () => {
                  const hasShot =
                    mapData.bullets.filter(
                      (b) => b.weapon === firstWeaponUpgrade.name
                    ).length > 1;

                  return gunWasSwitched() && hasShot;
                },
              },
            ],
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
                `,

                objectives: [battleObjective()],

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

function gunWasSwitched() {
  return (
    playerState.weapons.length > 1 &&
    (keysThatHaveBeenPressed.includes("Shift") ||
      keysThatHaveBeenPressed.includes("d") ||
      keysThatHaveBeenPressed.includes("D"))
  );
}

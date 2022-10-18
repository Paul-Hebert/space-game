import { showMenu } from "../hud/menus.js";
import { addMessageToQueue } from "../hud/messaging.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { random } from "../math/random.js";
import { keysThatHaveBeenPressed, resetPressedKeys } from "../pressed-keys.js";
import { SparrowShip } from "../ships/sparrow.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { mapSize } from "../map-size.js";
import { CrowShip } from "../ships/crow.js";
import { FastShip } from "../ships/fast.js";
import { DoubleGun } from "../weapons/double-gun.js";
import { SniperShip } from "../ships/Sniper.js";

export function level1() {
  playerState.health = playerState.maxHealth - 100;
  updateHealthBar();

  addMessageToQueue({
    content: `
      <p>We took some damage back there captain. I'm not sure if the engine's still
      working. Can you fire her up and see if we're alright?</p>

      <ul>
        <li>Use the <kbd>↑</kbd> key to accelerate.</li>
        <li>Use the <kbd>←</kbd> and <kbd>→</kbd> keys to turn.</li>
      </ul>
    `,
    exitRequirements: () => {
      return keysThatHaveBeenPressed.includes(
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp"
      );
    },
    nextAction: () => {
      addMessageToQueue({
        content: `
          <p>It looks like the engine's working. Let's see if our mining laser's still online.</p>

          <p>Press and hold the <kbd>Spacebar</kbd> to shoot your weapon.</p>
        `,
        exitRequirements: () => {
          return keysThatHaveBeenPressed.includes(" ");
        },
        nextAction: () => {
          addMessageToQueue({
            content: `
              <p>Great, shoot some of those asteroids. We can harvest resources to repair the ship.</p>

              <ul>
                <li>Green Resources repair the ship.</li>
                <li>Gold Resources can be used to upgrade the ship.</li>
              </ul>
            `,
            exitRequirements: () => {
              return playerState.health === playerState.maxHealth;
            },
            nextAction: () => {
              for (let i = 0; i < 2; i++) {
                const x = playerState.x + mapSize * random(1, 1.5);
                const y = playerState.y + random(-600, 600);

                mapData.ships.push(
                  new SparrowShip({
                    x,
                    y,
                  })
                );
              }

              mapData.ships.push(
                new CrowShip({
                  x: playerState.x + mapSize * random(1, 1.5) * -1,
                  y: playerState.y + random(-600, 600),
                })
              );

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
                      const hasSwitched =
                        keysThatHaveBeenPressed.includes("Shift");

                      const hasShot =
                        mapData.bullets.filter((b) => b.weapon === "double-gun")
                          .length > 1;

                      return hasSwitched && hasShot;
                    },
                    nextAction: () => {
                      for (let i = 0; i < 6; i++) {
                        const x = playerState.x + mapSize * random(1, 1.5);
                        const y = playerState.y + random(-600, 600);

                        mapData.ships.push(
                          new FastShip({
                            x,
                            y,
                          })
                        );
                      }

                      for (let i = 0; i < 3; i++) {
                        const x = playerState.x + mapSize * random(1, 1.5) * -1;
                        const y = playerState.y + random(-600, 600);

                        mapData.ships.push(
                          new SparrowShip({
                            x,
                            y,
                          })
                        );
                      }

                      mapData.ships.push(
                        new SniperShip({
                          x: playerState.x + mapSize * random(1.5, 2.5) * 1,
                          y: playerState.y + random(-1200, 1200),
                        })
                      );

                      addMessageToQueue({
                        content: `
                          <p>Uh oh, reinforcements are on the way.</p>
                          <div class="objective">0/10 ships destroyed.</div>
                        `,

                        updateObjective: () => {
                          return `${
                            10 - mapData.ships.length
                          }/10 ships destroyed.`;
                        },

                        exitRequirements: () => {
                          return mapData.ships.length === 0;
                        },

                        nextAction: () => {
                          showMenu("success");
                        },
                      });
                    },
                  });
                },
              });
            },
          });
        },
      });
    },
  });
}

import { addShip } from "../actions/add-ship.js";
import { showMenu } from "../hud/menus.js";
import { addMessageToQueue } from "../hud/messaging.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { keysThatHaveBeenPressed } from "../pressed-keys.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";

export function level1() {
  playerState.health = (playerState.maxHealth * 4) / 5;
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
      console.log(keysThatHaveBeenPressed);
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
              for (let i = 0; i < 5; i++) {
                addShip();
              }

              addMessageToQueue({
                content: `
                  <p>
                    Alright, our ship's been repaired but it sounds like 
                    trouble's on the way. We're under attack! 
                    Shoot down those enemy ships!
                  </p>

                  <div class="objective">0/5 ships destroyed.</div>
                `,
                exitRequirements: () => {
                  return mapData.ships.length === 0;
                },
                nextAction: () => {
                  showMenu("success");
                },
                updateObjective: () => {
                  return `${5 - mapData.ships.length}/5 ships destroyed.`;
                },
              });
            },
          });
        },
      });
    },
  });
}

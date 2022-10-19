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
import { SniperShip } from "../ships/Sniper.js";
import { BigShip } from "../ships/big.js";
import { completeLevel } from "./levels.js";

export function level1() {
  for (let i = 0; i < 5; i++) {
    const x = playerState.x + mapSize * random(1, 1.5);
    const y = playerState.y + random(-600, 600);

    mapData.ships.push(
      new SparrowShip({
        x,
        y,
      })
    );
  }

  for (let i = 0; i < 12; i++) {
    const x = playerState.x - mapSize * random(1, 1.5);
    const y = playerState.y + random(-600, 600);

    mapData.ships.push(
      new FastShip({
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

  mapData.ships.push(
    new SniperShip({
      x: playerState.x + mapSize - random(1, 1.5) * -1,
      y: playerState.y + random(-600, 600),
    })
  );

  mapData.ships.push(
    new BigShip({
      x: playerState.x + mapSize - random(1, 1.5) * -5,
      y: playerState.y + random(-600, 600),
    })
  );

  addMessageToQueue({
    content: `
      <p>More enemy ships incoming!.</p>
      <div class="objective">0/20 ships destroyed.</div>
    `,

    updateObjective: () => {
      return `${20 - mapData.ships.length}/20 ships destroyed.`;
    },

    exitRequirements: () => {
      return mapData.ships.length === 0;
    },

    nextAction: () => {
      completeLevel();
    },
  });
}

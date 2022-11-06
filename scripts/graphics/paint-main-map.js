import { isInBounds } from "../math/is-in-bounds.js";
import { relativePosition } from "../math/relative-position.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { mainCanvas, mainCtx, clearMainCanvas } from "./canvas.js";
import { drawCircle } from "./draw-circle.js";
import { drawSprite } from "./draw-sprite.js";
import { Resource } from "../objects/resource.js";

const asteroidSprites = document.getElementById("asteroid-sprites");

export function paintMainMap() {
  clearMainCanvas();

  const { resources, asteroids, bullets, stars, exhaust, explosions } = mapData;

  [
    ...stars,
    ...asteroids,
    ...resources,
    ...exhaust,
    ...explosions,
    ...bullets,
  ].forEach((object) => {
    const premature = object.maxAge && object.age < 0;
    if (!premature) {
      const pos = relativePosition(object);

      if (isInBounds(pos, mainCanvas)) {
        const settings = {
          ...object,
          ...pos,
        };

        if (object.age && object.maxAge) {
          settings.opacity = 1 - object.age / object.maxAge;
        }

        if (object.fill) {
          drawCircle(mainCtx, settings);
        } else if (object.spritePos) {
          drawSprite(
            mainCtx,
            {
              ...pos,
              radius: object.radius,
              rotation: object.rotation,
            },
            asteroidSprites,
            object.spritePos
          );
        }

        // If this is a resource with a weapon upgrade, draw the weapon.
        if (object instanceof Resource && object.type === "weapon-upgrade") {
          // TODO: Switch to `draw` to get double guns working?
          object.upgradeDetails.draw(
            mainCtx,
            {
              ...object,
              size: object.radius * 2,
            },
            false
          );
        }
      }
    }
  });

  mapData.ships.forEach((ship) => {
    // TODO: Check if in bounds
    ship.draw(mainCtx);
  });

  if (playerState.health > 0) {
    playerState.draw(mainCtx);
  }
}

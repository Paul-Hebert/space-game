import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { isColliding } from "../math/is-colliding.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";
import { angleBetweenPoints } from "../math/angle-between-points.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { gameLoop } from "../game-loop.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { updateResourceCount } from "../hud/update-resource-count.js";
import { showMenu } from "../hud/menus.js";
import { updateWeapons } from "../hud/update-weapons.js";

export function updateResources() {
  mapData.resources = mapData.resources
    .map((resource) => {
      if (distanceBetweenPoints(playerState, resource) < 300) {
        const angle = degreesToRadians(
          angleBetweenPoints(resource, playerState)
        );
        const speed = 1;

        resource.speed.x += Math.cos(angle) * speed;
        resource.speed.y += Math.sin(angle) * speed;

        resource.speed = constrainSpeed(resource);

        resource.age -= 5;
        if (resource.age < 0) resource.age = 0;
      }
      return resource;
    })
    .filter((resource) => {
      if (
        isColliding(resource, {
          ...playerState,
          radius: 60,
        })
      ) {
        let sound = "notification-2";

        if (resource.type === "health") {
          playerState.health += 100;
          updateHealthBar();
        } else if (resource.type === "money") {
          playerState.resourceCount++;
          updateResourceCount();
        } else if (resource.type === "weapon-upgrade") {
          sound = "weapon-pickup";
          showMenu("upgrade");
          gameLoop.pause();
          playerState.weapons.push(resource.upgradeDetails);
          updateWeapons();
        }

        playSoundFile(sound);
        return false;
      }
      return true;
    });
}

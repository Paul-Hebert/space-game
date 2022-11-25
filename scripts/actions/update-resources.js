import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { isColliding } from "../math/is-colliding.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";
import { angleBetweenPoints } from "../math/angle-between-points.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { updateResourceCount } from "../hud/update-resource-count.js";
import { updateWeapons } from "../hud/update-weapons.js";
import { addMessageToQueue } from "../hud/messaging.js";

export function updateResources() {
  mapData.resources = mapData.resources
    .map((resource) => {
      if (
        distanceBetweenPoints(playerState, resource) <
        playerState.resourceDrawDistance
      ) {
        const angle = degreesToRadians(
          angleBetweenPoints(resource, playerState)
        );
        const speed = playerState.resourceDrawSpeed;

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
        if (resource.type === "health") {
          playSoundFile("notification-2");
          playerState.health += 50;
          updateHealthBar();
        } else if (resource.type === "money") {
          playSoundFile("notification-2");
          playerState.resourceCount++;
          updateResourceCount();
        } else if (
          resource.type === "weapon-upgrade" ||
          resource.type === "ship-upgrade"
        ) {
          resource.upgradeDetails.pickup();
          addMessageToQueue({
            content: resource.upgradeDetails.messageContent(),
            duration: 600,
            theme: "success",
          });
        }
        return false;
      }
      return true;
    });
}

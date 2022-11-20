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

          const gun = resource.upgradeDetails;

          playerState.weapons.push(gun);
          updateWeapons();

          // TODO: Add description (and graphic? stats?)
          addMessageToQueue({
            content: `
              <h4>Weapon Collected: ${gun.name}</h4>

              <p><em>${gun.description}</em></p>

            `,
            theme: "success",
            duration: 600,
          });
        }

        playSoundFile(sound);
        return false;
      }
      return true;
    });
}

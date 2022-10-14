import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { isColliding } from "../math/is-colliding.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";
import { angleBetweenPoints } from "../math/angle-between-points.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { updateHealth } from "./update-health.js";

const resourceCountEl = document.querySelector(".resource-count");

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
        playerState.health += 50;
        updateHealth();
        playerState.resourceCount++;
        resourceCountEl.textContent = playerState.resourceCount;
        return false;
      }
      return true;
    });
}

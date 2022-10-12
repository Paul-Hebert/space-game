import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { isColliding } from "../math/is-colliding.js";

const resourceCountEl = document.querySelector(".resource-count");

export function updateResources() {
  mapData.resources = mapData.resources.filter((resource) => {
    if (
      isColliding(resource, {
        ...playerState,
        radius: 60,
      })
    ) {
      playerState.resourceCount++;
      resourceCountEl.textContent = playerState.resourceCount;
      return false;
    }
    return true;
  });
}

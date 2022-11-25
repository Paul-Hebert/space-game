import { playerState } from "../state/player-state.js";

const resourceCountEl = document.querySelector(".resource-count");

export function updateResourceCount() {
  if (resourceCountEl.textContent !== playerState.resourceCount) {
    resourceCountEl.textContent = playerState.resourceCount;
  }
}

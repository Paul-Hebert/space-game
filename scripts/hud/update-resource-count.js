import { playerState } from "../state/player-state.js";

const resourceCountEl = document.querySelector(".resource-count");

export function updateResourceCount() {
  resourceCountEl.textContent = playerState.resourceCount;
}

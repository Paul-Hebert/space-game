import { playerState } from "../state/player-state.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";

export function volumeRelativeToPlayer({ x, y }) {
  const distance = distanceBetweenPoints({ x, y }, playerState);

  if (distance < 100) {
    return 1;
  }

  return 1 / (distance / 200);
}

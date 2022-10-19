import { resetMap } from "../state/map-data.js";

export function newLevel(level) {
  resetMap();

  level();
}

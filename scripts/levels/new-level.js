import { updateHealthBar } from "../hud/update-health-bar.js";
import { resetMap } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";

export function newLevel(level) {
  playerState.health = playerState.maxHealth;
  updateHealthBar();
  resetMap();

  level();
}

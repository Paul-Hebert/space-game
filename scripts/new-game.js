import { resetPlayerState } from "./state/player-state.js";
import { resetUi } from "./hud/reset-ui.js";
import { currentLevel, levels, resetCurrentLevel } from "./levels/levels.js";
import { newLevel } from "./levels/new-level.js";
import { resetShipsDestroyed } from "./state/game-stats.js";
import { resetMap } from "./state/map-data.js";

export function newGame() {
  resetMap();
  resetShipsDestroyed();
  resetPlayerState();
  resetUi();
  resetCurrentLevel();

  newLevel(levels[currentLevel]);
}

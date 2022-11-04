import { resetPlayerState } from "./state/player-state.js";
import { resetUi } from "./hud/reset-ui.js";
import { currentLevel, levels, resetCurrentLevel } from "./levels/levels.js";
import { resetGameStats } from "./state/game-stats.js";
import { resetMap } from "./state/map-data.js";

export function newGame() {
  resetMap();
  resetGameStats();
  resetPlayerState();
  resetUi();
  resetCurrentLevel();

  levels[currentLevel]();
}

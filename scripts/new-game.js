import "./size-canvas.js";
import { resetPlayerState } from "./state/player-state.js";
import { resetUi } from "./hud/reset-ui.js";
import { currentLevel, levels, resetCurrentLevel } from "./levels/levels.js";
import { newLevel } from "./levels/new-level.js";

export function newGame() {
  resetPlayerState();
  resetUi();
  resetCurrentLevel();

  newLevel(levels[currentLevel]);
}

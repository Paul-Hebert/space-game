import {
  updateHealthBar,
  updateHealthBarSize,
} from "../hud/update-health-bar.js";
import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class HealthUpgrade extends BaseUpgrade {
  value = 100;

  name = "Hull Strength Increased";
  description = `Maximum ship health increased by ${this.value}!`;

  upgradeAction = () => {
    playerState.health += this.value;
    playerState.maxHealth += this.value;
    updateHealthBar();
    updateHealthBarSize();
  };
}

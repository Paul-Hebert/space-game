import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class HealthUpgrade extends BaseUpgrade {
  value = 200;

  name = "Hull Strength Reinforced";
  description = `Maximum ship health increased!`;

  upgradeAction = () => {
    playerState.health += this.value;
    playerState.maxHealth += this.value;
    updateHealthBarSize();
  };
}

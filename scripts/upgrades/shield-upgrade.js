import { updateShieldBarSize } from "../hud/update-shield-bar.js";
import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class ShieldUpgrade extends BaseUpgrade {
  value = 100;

  name = "Shields Reinforced";
  description = `Maximum ship shield power increased!`;

  upgradeAction = () => {
    playerState.shields += this.value;
    playerState.maxShields += this.value;
    updateShieldBarSize();
  };
}

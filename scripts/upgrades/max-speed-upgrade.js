import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class MaxSpeedUpgrade extends BaseUpgrade {
  value = 0.75;

  name = "Fins streamlined";
  description = `Maximum ship speed increased!`;

  upgradeAction = () => {
    playerState.maxSpeed += this.value;
  };
}

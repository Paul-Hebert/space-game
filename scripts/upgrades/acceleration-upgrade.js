import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class AccelerationSpeedUpgrade extends BaseUpgrade {
  value = 0.75;

  name = "Thrusters enhanced";
  description = `Acceleration speed increased!`;

  upgradeAction = () => {
    playerState.maxSpeed += this.value;
  };
}

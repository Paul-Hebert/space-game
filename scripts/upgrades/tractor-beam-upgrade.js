import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class TractorBeamUpgrade extends BaseUpgrade {
  name = "Tractor Beam Power Increased";
  description = `Attract resources and upgrades from further away more quickly!`;

  upgradeAction = () => {
    playerState.resourceDrawDistance += 200;
    playerState.resourceDrawSpeed += 2;
  };
}

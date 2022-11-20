import { updateWeapons } from "../hud/update-weapons.js";
import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class WeaponUpgrade extends BaseUpgrade {
  constructor(gun) {
    super();
    this.name = `Weapon Collected: ${gun.name}`;
    this.description = gun.description;
    this.gun = gun;
  }

  upgradeAction = () => {
    playerState.weapons.push(this.gun);
    updateWeapons();
  };
}

import { showMenu } from "../hud/menus.js";
import { showShieldBar } from "../hud/update-shield-bar.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { playerState } from "../state/player-state.js";
import { BaseUpgrade } from "./base-upgrade.js";

export class InitialShieldUpgrade extends BaseUpgrade {
  addMessage = false;

  pickup() {
    playSoundFile("upgrade-pickup");

    playerState.shields = 200;
    playerState.maxShields = 200;
    showShieldBar();

    showMenu("shieldUpgrade");
  }
}

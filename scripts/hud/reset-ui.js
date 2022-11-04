import { removeAllMessages } from "./messaging.js";
import { updateHealthBar } from "./update-health-bar.js";
import { updateResourceCount } from "./update-resource-count.js";
import { resetPressedKeys } from "../state/pressed-keys.js";
import { updateCurrentWeapon } from "./update-current-weapon.js";

export function resetUi() {
  updateCurrentWeapon();
  updateHealthBar();
  updateResourceCount();
  removeAllMessages();
  resetPressedKeys();
}

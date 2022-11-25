import { removeAllMessages } from "./messaging.js";
import { updateHealthBar, updateHealthBarSize } from "./update-health-bar.js";
import { updateResourceCount } from "./update-resource-count.js";
import { resetPressedKeys } from "../state/pressed-keys.js";
import { updateWeapons } from "./update-weapons.js";
import { updateShieldBar, updateShieldBarSize } from "./update-shield-bar.js";

export function resetUi() {
  updateWeapons();

  updateShieldBar();
  updateShieldBarSize();

  updateHealthBar();
  updateHealthBarSize();

  updateResourceCount();

  removeAllMessages();

  resetPressedKeys();
}

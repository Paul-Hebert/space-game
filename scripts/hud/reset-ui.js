import { removeAllMessages } from "./messaging.js";
import { updateHealthBar } from "./update-health-bar.js";
import { updateResourceCount } from "./update-resource-count.js";
import { resetPressedKeys } from "../state/pressed-keys.js";
import { updateWeapons } from "./update-weapons.js";

export function resetUi() {
  updateWeapons();
  updateHealthBar();
  updateResourceCount();
  removeAllMessages();
  resetPressedKeys();
}

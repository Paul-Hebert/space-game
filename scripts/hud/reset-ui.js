import { removeAllMessages } from "./messaging.js";
import { updateHealthBar } from "./update-health-bar.js";
import { updateResourceCount } from "./update-resource-count.js";
import { resetPressedKeys } from "../pressed-keys.js";

export function resetUi() {
  updateHealthBar();
  updateResourceCount();
  removeAllMessages();
  resetPressedKeys();
}

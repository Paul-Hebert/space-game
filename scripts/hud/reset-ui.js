import { updateHealthBar } from "./update-health-bar.js";
import { updateResourceCount } from "./update-resource-count.js";

export function resetUi() {
  updateHealthBar();
  updateResourceCount();
}

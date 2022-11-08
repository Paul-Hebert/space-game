import { mapData } from "../../state/map-data.js";

export function battleObjective() {
  return {
    text: enemyText(),
    updateText: enemyText,
    evaluate: () => mapData.ships.length === 0,
  };
}

function enemyText() {
  return mapData.ships.length === 1
    ? "1 enemy remaining."
    : `${mapData.ships.length} enemies remaining.`;
}

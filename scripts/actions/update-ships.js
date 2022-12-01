import { mapData } from "../state/map-data.js";

export function updateShips() {
  mapData.ships
    .filter((ship) => ship.health > 0)
    .forEach((ship) => ship.update());
}

import { mapData } from "../state/map-data.js";

export function updateShips() {
  mapData.ships.forEach((ship) => ship.update());
  mapData.ships = mapData.ships.filter((ship) => {
    return ship.health > 0;
  });
}

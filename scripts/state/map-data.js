import { createMap } from "../create-map.js";

export let mapData = createMap();

export function resetMap() {
  mapData = createMap();
}

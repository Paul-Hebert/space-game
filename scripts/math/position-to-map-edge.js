import { playerState } from "../state/player-state.js";
import { mapSize } from "../map-size.js";
import { random, randomItemInArray } from "./random.js";

export function positionToMapTop(distance = random(1, 1.5), xVariance = 600) {
  return {
    y: playerState.y - mapSize * distance,
    x: playerState.x + random(-1 * xVariance, xVariance),
  };
}

export function positionToMapBottom(
  distance = random(1, 1.5),
  xVariance = 600
) {
  return {
    y: playerState.y + mapSize * distance,
    x: playerState.x + random(-1 * xVariance, xVariance),
  };
}

export function positionToMapRight(distance = random(1, 1.5), yVariance = 600) {
  return {
    x: playerState.x + mapSize * distance,
    y: playerState.y + random(-1 * yVariance, yVariance),
  };
}

export function positionToMapLeft(distance = random(1, 1.5), yVariance = 600) {
  return {
    x: playerState.x - mapSize * distance,
    y: playerState.y + random(-1 * yVariance, yVariance),
  };
}

export function positionToRandomMapEdge() {
  const edgeFunction = randomMapEdgeFunction();
  return edgeFunction();
}

export function randomMapEdgeFunction() {
  return randomItemInArray([
    positionToMapBottom,
    positionToMapLeft,
    positionToMapRight,
    positionToMapTop,
  ]);
}

import { playerState } from "../state/player-state.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { constrainSpeed } from "../math/constrain-speed.js";

export function acceleratePlayer(constrained = true, modifier = 1) {
  const rotationInRadians = degreesToRadians(playerState.rotation);
  playerState.speed.x +=
    Math.sin(rotationInRadians) * playerState.accelerationSpeed * modifier;
  playerState.speed.y +=
    Math.cos(rotationInRadians) * playerState.accelerationSpeed * modifier;

  if (constrained) playerState.speed = constrainSpeed(playerState);

  if (modifier > 0) {
    playerState.addExhaust();
    playerState.engineNoise();
  }
}

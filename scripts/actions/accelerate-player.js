import { playerState } from "../state/player-state.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { angledSpeed, constrainSpeed } from "../math/constrain-speed.js";
import { isJumping } from "./hyper-speed-jump.js";

export function acceleratePlayer(
  constrained = true,
  modifier = 1,
  rotationModifier = 0
) {
  const rotationInRadians = degreesToRadians(
    playerState.rotation + rotationModifier
  );
  playerState.speed.x +=
    Math.sin(rotationInRadians) * playerState.accelerationSpeed * modifier;
  playerState.speed.y +=
    Math.cos(rotationInRadians) * playerState.accelerationSpeed * modifier;

  if (constrained) playerState.speed = constrainSpeed(playerState);

  if (modifier > 0) {
    playerState.addExhaust();
    if (isJumping) {
      for (let i = 0; i < angledSpeed(playerState.speed) / 4; i++) {
        playerState.addExhaust(i * 5);
      }
    }
    playerState.engineNoise();
  }
}

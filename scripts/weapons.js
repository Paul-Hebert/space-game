import { Bullet } from "./objects/bullet.js";
import { degreesToRadians } from "./math/degrees-to-radians.js";

// TODO: Make these classes to DRY things up
export const weapons = {
  ray: {
    name: "ray",
    speed: 10,
    reloadSpeed: 1,
    shoot: (playerState) => {
      return [
        new Bullet({
          ...positionToNose(playerState, 0),
          speed: angledSpeed(playerState, 10),
          age: 0,
          maxAge: 40,
          radius: 10,
          fill: "blue",
          damage: 10,
        }),
      ];
    },
  },
  pew: {
    name: "pew",
    speed: 30,
    reloadSpeed: 5,
    shoot: (playerState) => {
      return [
        // TODO: DRY up
        new Bullet({
          ...positionToNose(playerState, 0),
          speed: angledSpeed(playerState, 10),
          maxAge: 100,
          radius: 4,
          fill: "red",
          damage: 5,
        }),
        new Bullet({
          ...positionToNose(playerState, 2),
          speed: angledSpeed(playerState, 10),
          maxAge: 100,
          radius: 4,
          fill: "red",
          damage: 5,
        }),
        new Bullet({
          ...positionToNose(playerState, 4),
          speed: angledSpeed(playerState, 10),
          maxAge: 100,
          radius: 4,
          fill: "red",
          damage: 5,
        }),
        new Bullet({
          ...positionToNose(playerState, 6),
          speed: angledSpeed(playerState, 10),
          maxAge: 100,
          radius: 4,
          fill: "red",
          damage: 5,
        }),
        new Bullet({
          ...positionToNose(playerState, 8),
          speed: angledSpeed(playerState, 10),
          maxAge: 100,
          radius: 4,
          fill: "red",
          damage: 5,
        }),
        new Bullet({
          ...positionToNose(playerState, 10),
          speed: angledSpeed(playerState, 10),
          maxAge: 100,
          radius: 4,
          fill: "red",
          damage: 5,
        }),
      ];
    },
  },
};

// TODO: Abstract to more generic helper
function positionToNose(playerState, offset = 0) {
  // I don't understand why -90 is necessary here...
  const rotationInRadians = degreesToRadians(playerState.rotation - 90);
  return {
    x:
      playerState.x +
      Math.cos(rotationInRadians) * (playerState.shipSize + offset),
    y:
      playerState.y +
      Math.sin(rotationInRadians) * (playerState.shipSize + offset),
  };
}

function angledSpeed(playerState, speed) {
  // I don't understand why -90 is necessary here...
  const rotationInRadians = degreesToRadians(playerState.rotation - 90);
  return {
    x: Math.cos(rotationInRadians) * speed,
    y: Math.sin(rotationInRadians) * speed,
  };
}

import { loop } from "./loop.js";
import { createMap } from "./create/map.js";
import { paint } from "./graphics/paint.js";
import { moveObject } from "./actions/move-object.js";
import "./size-canvas.js";
import { degreesToRadians } from "./math/degrees-to-radians.js";
import { pressedKeys } from "./pressed-keys.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { isColliding } from "./math/is-colliding.js";
import { playSound } from "./play-sound.js";
import { random } from "./math/random.js";
import { hsl } from "./graphics/hsl.js";
import { weapons } from "./weapons.js";

let currentGun = weapons.pew;

const resourceCountEl = document.querySelector(".resource-count");

const shipSize = 60;
const rotationSpeed = 2;
const acceleration = 0.1;

let mapData = createMap();

let playerState = {
  resourceCount: 0,
  x: 0,
  y: 0,
  rotation: 0,
  speed: {
    x: 0,
    y: 0,
  },
};

const gameLoop = loop(() => {
  mapData.asteroids = mapData.asteroids.map((asteroid) => {
    asteroid.rotation += asteroid.rotationSpeed;
    if (asteroid.rotation < 0) asteroid.rotation += 360;
    if (asteroid.rotation > 360) asteroid.rotation -= 360;
    return moveObject(asteroid);
  });

  mapData.resources = mapData.resources
    .filter((resource) => {
      if (
        isColliding(resource, {
          ...playerState,
          radius: 60,
        })
      ) {
        playerState.resourceCount++;
        resourceCountEl.textContent = playerState.resourceCount;
        return false;
      }
      return true;
    })
    .map((resource) => moveObject(resource));

  mapData.bullets = mapData.bullets
    .map((bullet) => {
      bullet.age--;
      return moveObject(bullet);
    })
    .filter((bullet) => bullet.age > 0);

  mapData.exhaust = mapData.exhaust
    .map((exhaustParticle) => {
      exhaustParticle.age--;
      return moveObject(exhaustParticle);
    })
    .filter((exhaustParticle) => exhaustParticle.age > 0);

  mapData.explosions = mapData.explosions
    .map((explosion) => {
      explosion.age--;
      return moveObject(explosion);
    })
    .filter((explosion) => explosion.age > 0);

  console.log(mapData);

  mapData = handleCollisions(mapData);

  paint(mapData, playerState);

  handlePlayerActions(playerState);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    gameLoop.toggle();
  }
});

export function handlePlayerActions() {
  if (pressedKeys["ArrowRight"]) {
    playerState.rotation += rotationSpeed;
  }
  if (pressedKeys["ArrowLeft"]) {
    playerState.rotation -= rotationSpeed;
  }

  if (pressedKeys["ArrowUp"]) {
    const rotationInRadians = degreesToRadians(playerState.rotation);
    playerState.speed.x += Math.sin(rotationInRadians) * acceleration;
    playerState.speed.y += Math.cos(rotationInRadians) * acceleration;

    const exhaustColor = hsl({
      h: random(0, 50),
      s: random(60, 90),
      l: random(40, 60),
    });

    mapData.exhaust.push({
      // Starting position is adjusted to be at the "tail" of the ship
      x:
        playerState.x -
        Math.cos(degreesToRadians(playerState.rotation - 90)) * shipSize,
      y:
        playerState.y -
        Math.sin(degreesToRadians(playerState.rotation - 90)) * shipSize,
      speed: {
        x: Math.cos(degreesToRadians(playerState.rotation + 90)) * 10,
        y: Math.sin(degreesToRadians(playerState.rotation + 90)) * 10,
      },
      // speed: playerState.speed,
      radius: random(5, 15),
      fill: exhaustColor,
      age: 10,
    });
  }

  playerState.y -= playerState.speed.y;
  playerState.x += playerState.speed.x;

  if (pressedKeys[" "]) {
    playSound({ duration: 20, frequency: 300, volumne: 1 });
    // I don't understand why -90 is necessary here...
    const rotationInRadians = degreesToRadians(playerState.rotation - 90);
    mapData.bullets.push({
      ...currentGun,
      // Starting position is adjusted to be at the "nose" of the ship
      x: playerState.x + Math.cos(rotationInRadians) * shipSize,
      y: playerState.y + Math.sin(rotationInRadians) * shipSize,
      speed: {
        x: Math.cos(rotationInRadians) * currentGun.speed,
        y: Math.sin(rotationInRadians) * currentGun.speed,
      },
      maxAge: currentGun.age,
    });
  }
}

window.addEventListener("keydown", ({ key }) => {
  if (key === "Shift") {
    currentGun = currentGun.name === "pew" ? weapons.ray : weapons.pew;
  }
});

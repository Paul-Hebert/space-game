import { degreesToRadians } from "../math/degrees-to-radians.js";
import { Explosion } from "../objects/explosion.js";
import { randomInt, random, randomBool } from "../math/random.js";

// TODO: Move sound here?

export function createExplosion(object, sizeModifier = 1) {
  const explosions = [];

  const baseSize = object.radius * sizeModifier;

  for (let i = 0; i < randomInt(baseSize / 4, baseSize / 2); i++) {
    const angle = random(0, 360);
    const rotationInRadians = degreesToRadians(angle);
    const speed = (Math.min(150, baseSize) / 300) * random(1, 10);
    const offset = Math.min(200, baseSize) / 100;

    explosions.push(
      new Explosion({
        age: random(-10, 0),
        radius: random(baseSize / 10, baseSize / 5),
        x: object.x + Math.cos(rotationInRadians) * offset,
        y: object.y + Math.sin(rotationInRadians) * offset,
        speed: {
          x: Math.cos(rotationInRadians) * speed,
          y: Math.sin(rotationInRadians) * speed,
        },
      })
    );

    if (randomBool(0.2)) {
      for (let x = 0; x < random(10, 20); x++) {
        explosions.push(
          new Explosion({
            radius: random(baseSize / (8 * x), baseSize / (5 * x)),
            age: random(-10, 0),
            x: object.x + Math.cos(rotationInRadians) * offset * x * 5,
            y: object.y + Math.sin(rotationInRadians) * offset * x * 5,
            speed: {
              x: Math.cos(rotationInRadians) * speed,
              y: Math.sin(rotationInRadians) * speed,
            },
          })
        );
      }
    }
  }

  return explosions;
}

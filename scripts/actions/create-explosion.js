import { degreesToRadians } from "../math/degrees-to-radians.js";
import { Explosion } from "../objects/explosion.js";
import { randomInt, random, randomBool } from "../math/random.js";

// TODO: Move sound here?

export function createExplosion(object) {
  const explosions = [];

  for (let i = 0; i < randomInt(object.radius / 4, object.radius / 2); i++) {
    const angle = random(0, 360);
    const rotationInRadians = degreesToRadians(angle);
    const speed = (Math.min(150, object.radius) / 300) * random(1, 10);
    const offset = Math.min(200, object.radius) / 100;

    explosions.push(
      new Explosion({
        age: random(-10, 0),
        radius: random(object.radius / 10, object.radius / 5),
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
            radius: random(object.radius / (8 * x), object.radius / (5 * x)),
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

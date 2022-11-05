import { moveObject } from "./move-object.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { mapSize } from "../map-size.js";
import { random } from "../math/random.js";

export function updateParticles() {
  mapData.asteroids = updateParticleGroup(mapData.asteroids);
  mapData.bullets = updateParticleGroup(mapData.bullets, true);
  mapData.exhaust = updateParticleGroup(mapData.exhaust, true);
  mapData.explosions = updateParticleGroup(
    mapData.explosions,
    playerState,
    true
  );
  mapData.resources = updateParticleGroup(mapData.resources, true);
  mapData.stars = updateParticleGroup(mapData.stars);

  return mapData;
}

function updateParticleGroup(particles, aging) {
  particles = particles.map((particle) => {
    if (particle.rotation && particle.rotationSpeed) {
      particle.rotation += particle.rotationSpeed;
      if (particle.rotation < 0) particle.rotation += 360;
      if (particle.rotation > 360) particle.rotation -= 360;
    }

    if (particle.speed) {
      particle = moveObject(particle);
    }

    if (aging && particle.maxAge) {
      particle.age++;
    }

    // If the particle is meant to "loop" then when it goes way off screen we'll send it
    // to the other edge of the map.
    // This ensures that as you fly you never fly past all the stars/asteroids/etc.
    if (particle.looping) {
      const depth = particle.parallaxDepth || 1;
      let xOverflowed = false;
      let yOverflowed = false;

      if (particle.x * depth < playerState.x + mapSize * -1) {
        particle.x += mapSize * 2;
        xOverflowed = true;
      }
      if (particle.y * depth < playerState.y + mapSize * -1) {
        particle.y += mapSize * 2;
        yOverflowed = true;
      }
      if (particle.x * depth > playerState.x + mapSize) {
        particle.x -= mapSize * 2;
        xOverflowed = true;
      }
      if (particle.y * depth > playerState.y + mapSize) {
        particle.y -= mapSize * 2;
        yOverflowed = true;
      }

      // Make repeating patterns less obvious
      if ((xOverflowed || yOverflowed) && particle.rotation) {
        particle.rotation = random(0, 360);
      }
    }

    return particle;
  });

  if (aging) {
    particles = particles.filter(
      (particle) => !particle.maxAge || particle.age < particle.maxAge
    );
  }

  return particles;
}

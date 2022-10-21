import { moveObject } from "./move-object.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";

export function updateParticles() {
  mapData.asteroids = updateParticleGroup(mapData.asteroids, playerState);
  mapData.bullets = updateParticleGroup(mapData.bullets, playerState, true);
  mapData.exhaust = updateParticleGroup(mapData.exhaust, playerState, true);
  mapData.explosions = updateParticleGroup(
    mapData.explosions,
    playerState,
    true
  );
  mapData.resources = updateParticleGroup(mapData.resources, playerState, true);

  return mapData;
}

function updateParticleGroup(particles, playerState, aging) {
  particles = particles.map((particle) => {
    if (particle.rotation && particle.rotationSpeed) {
      particle.rotation += particle.rotationSpeed;
      if (particle.rotation < 0) particle.rotation += 360;
      if (particle.rotation > 360) particle.rotation -= 360;
    }

    if (particle.speed) {
      particle = moveObject(particle, playerState);
    }

    if (aging) {
      particle.age++;
    }

    return particle;
  });

  if (aging) {
    particles = particles.filter((particle) => particle.age < particle.maxAge);
  }

  return particles;
}

import { moveObject } from "./move-object.js";

export function updateParticles(mapData) {
  mapData.asteroids = updateParticleGroup(mapData.asteroids);
  mapData.bullets = updateParticleGroup(mapData.bullets, true);
  mapData.exhaust = updateParticleGroup(mapData.exhaust, true);
  mapData.explosions = updateParticleGroup(mapData.explosions, true);
  mapData.resources = updateParticleGroup(mapData.resources);

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

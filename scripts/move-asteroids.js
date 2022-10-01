export function moveAsteroids(asteroids) {
  return asteroids.map((asteroid) => {
    asteroid.x += asteroid.speed.x;
    asteroid.y += asteroid.speed.y;

    return asteroid;
  });
}

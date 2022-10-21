## Technical Refactors

- Improve how rotation/speed works.
  - Objects should have a direction and a speed, not an x speed and y speed
  - Ships should have a max speed
  - We should be able to improve the direction of explosions
- Loop should have a target frame rate and handle dropped frames
- tests
- Math.hypot is slow. Roll our own

- Clean things up
  - Ship logic and shoot functionality should move to ship class
  - Position to nose and position to tail should move to ship class
  - Bullets should maybe be assigned a ship, not a ship id?

## Core Features

- Enemy ship battles

## Advanced Features

- Traveling between stars/planets
- Ship upgrades
- Quests
- Better sounds!

## Graphics

- Sprites for resources
- Fix asteroid sprite clipping bugs

## Map

## UI

- Show ship health
- Menus

## Bugs

- Bullets don't work when facing directly to the right
- Looping doesn't work for stars (because they have parallax)

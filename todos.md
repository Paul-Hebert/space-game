## Technical Refactors

- Loop should have a target frame rate and handle dropped frames
- tests
- Math.hypot is slow. Roll our own
- Clean things up
  - Ship logic and shoot functionality should move to ship class
  - Position to nose and position to tail should move to ship class
  - Bullets should maybe be assigned a ship, not a ship id?

## Core Features

## Advanced Features

- Generative Levels
- Traveling between stars/planets
- Ship upgrades
- Quests
- Better sounds!

## Graphics

- Sprites for resources
- Fix asteroid sprite clipping bugs
- Better explosions - player explosion

## UI

- Minimap
- Full screen controls
- Audio toggle
- Show selected weapon
- Touch screen controls

## Bugs

- Bullets don't work when facing directly to the right
- Looping doesn't work for stars (because they have parallax)

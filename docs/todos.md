## Technical Refactors

- Loop should have a target frame rate and handle dropped frames
- tests
- Math.hypot is slow. Roll our own
- Clean things up
  - Ship logic and shoot functionality should move to ship class
  - Position to nose and position to tail should move to ship class
  - Bullets should maybe be assigned a ship, not a ship id?
  - Move map size to map data?

## Advanced Features

- Generative Levels
- Traveling between stars/planets
- Ship upgrades
- Quests
- Better sounds!

## Graphics

- Move generative image logic into this repo?
- Sprites for resources
- Better explosions - player explosion

## UI

- Minimap
  - Handle off-screen elements
- Full screen controls
- Audio toggle
- Show selected weapon
- Touch screen controls
- Better objective/messaging system

## Gameplay tweaks

- Smaller ships should drop less resources?
- Should asteroid collisions be a thing?
- Ships should "drop" upgrades in addition to esources

## Bugs

- Bullets don't work when facing directly to the right

## Audio

- Explosions are too loud. Tone down impact of proximity to player?
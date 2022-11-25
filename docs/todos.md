## Technical Refactors

- build system for external deps
- tests
- Clean things up
  - Ship logic and shoot functionality should move to ship class?
  - Position to nose and position to tail should move to ship class?
  - Bullets should maybe be assigned a ship, not a ship id?
  - Move map size to map data?

## Advanced Features

- Traveling between stars/planets
- Ship upgrades
- Quests
- Better sounds!

## Graphics

- Move generative image logic into this repo?
- Sprites for resources
- Better explosions:
  - player explosion
  - Bullet explosion size/count should be based on damage
  - Better asteroid explosions
- Handle different screen resolutions better

## UI

- Minimap
  - Handle off-screen elements
- Full screen controls
- Audio toggle
- Way to change controls
- Show selected weapon
- Touch screen controls
- Better objective/messaging system
- When selecting controls show longer descriptions
- Support WASD

## Gameplay tweaks

- Should asteroid collisions be a thing?
- Single use weapons

## Audio

- Explosions are too loud. Tone down impact of proximity to player?

## A11y

- Alt text for upgrade images
- Better modals
- Focus styles

## Perf

- Sort ship weapons on ship creation

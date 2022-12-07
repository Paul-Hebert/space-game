# Road map

- bombs should explode when shot

  - Should they be missiles with a speed of 0?

- Enemy AI

  - Idle ship behavior
    - Min distance to detect player
    - What to do before player detected
  - Ship behavior archetypes
    - Space station
      - Spawner or Shooter or Combo
      - 0 movement
    - Transport
      - Spawns ships
      - Runs away when enemies are near
    - Armed Transport
      - Spawns ships when long range
      - Shoots up close with short range gun
    - Hunters
      - Short-range guns
      - Always wants to be close to enemy
    - Taunter
      - Short-range guns
      - Flees right past gun range, but drop bombs when leaving
    - Gunships
      - Multiple weapon types - changes based on range
      - If shield are low, run and regenerate
      - May have bombs
    - Escort
      - Follow another ship
      - Only split off when near player
      - Return to main ship when too far away
    - Bosses
      - Mixed
  - Better boss behaviors
  - Mess with ship speed more

- Better levels/plot

  - Same tutorial

- Ships that spawn enemies should _maybe_ not be damageable by their child ships

- Boss music

- Objectives UI

  - Main "objective" message should always be at the top
  - Repeates pulses for "nag" messages
  - Sound effects
  - Revamp message queue design
  - Explore more objective types
    - "Boss" levels
    - Get to objective without dying - e.g. pick up X resources
    - Space station levels
    - "Obstacle course"
    - Destroy X stations without dying
  - Add map navigation between levels
  - Move weapon upgrades to message queue?

- Upgrades
  - Add support for primary + secondary weapons (front and sides)
  - Guided missiles
  - Single use items: bombs, speed boosts, etc.
  - Non-weapon upgrades
- Show ship damage better
  - Create repeated explosions/fires based on damage?
  - Warning noise + popup when health is low

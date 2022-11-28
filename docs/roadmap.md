# Road map

- Enemy AI

  - Add option to evade/flee when:
    - Under a certain distance
    - Shields are down
    - Health is low
  - Allow firing some weapon types while fleeing (For now just spawners. Bombs in the future.)
  - Add bombs
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
      - If shield are 0, run
      - May have bombs
    - Bosses
      - Mixed
  - Better boss behaviors

- Ships that spawn enemies should not be damageable by their child ships

- Boss music

- Objectives UI

  - Main "objective" message should always be at the top
  - Repeates pulses for "nag" messages
  - Sound effects
  - Revamp message queue design
  - Explore more objective types
    - "Boss" levels
    - Get to objective without dying
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

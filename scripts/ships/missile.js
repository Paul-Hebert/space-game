import { damageShip } from "../actions/damage-ship.js";
import { isColliding } from "../math/is-colliding.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { BaseShip } from "./base.js";

export class Missile extends BaseShip {
  size = 30;
  maxHealth = 20;
  health = 20;

  type = "gun";

  damage = 100;

  age = 0;
  maxAge = 200;

  graphic = document.getElementById("ship-3");

  maxSpeed = 20;
  accelerationSpeed = 5;
  rotationSpeed = 5;

  upgradeDropChance = 0;
  maxResourceCount = 0;

  weapons = [];

  targetRange = {
    min: 0,
  };

  specialBehavior() {
    this.age++;

    if (this.health <= 0) {
      return;
    }

    if (this.age > this.maxAge) {
      this.die();
      return;
    }

    // TODO: Should these collide with other ships/asteroids?
    if (
      isColliding(
        { ...this, radius: this.size / 2 },
        {
          ...playerState,
          radius: playerState.size / 2,
        }
      )
    ) {
      damageShip(this.damage, playerState);
      this.die();
      return;
    }
  }

  die() {
    this.health = 0;
    const { explosions } = this.explode(5);
    mapData.explosions = mapData.explosions.concat(explosions);
  }
}

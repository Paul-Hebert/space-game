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

  graphic = document.getElementById("sparrow");

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

    if (this.parentId !== playerState.id) {
      this.checkShipCollision(playerState);
    }
    mapData.ships.forEach((ship) => {
      if (this.parentId !== ship.id && this.id !== ship.id) {
        this.checkShipCollision(ship);
      }
    });
  }

  checkShipCollision(ship) {
    if (
      isColliding(
        {
          x: this.x,
          y: this.y,
          radius: this.size / 2,
        },
        {
          x: ship.x,
          y: ship.y,
          radius: ship.size / 2,
        }
      )
    ) {
      damageShip(this.damage, ship);
      this.die();
    }
  }

  explosionModifier = 5;

  die() {
    this.health = 0;
    const { explosions } = this.explode();
    mapData.explosions = mapData.explosions.concat(explosions);
  }
}

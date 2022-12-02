import { BaseShip } from "../../base.js";
import { DoubleGun } from "../../../weapons/double-gun.js";
import { mapData } from "../../../state/map-data.js";
import { SmallFighterSpawner } from "../../../weapons/small-fighter-spawner.js";
import { Boom } from "../../../weapons/boom.js";

export class Commander extends BaseShip {
  size = 200;

  health = 1000;
  maxHealth = 1000;

  maxSpeed = 6;
  rotationSpeed = 2;
  accelerationSpeed = 1;

  minEscorts = 3;

  changeWeapons() {
    if (
      mapData.ships.filter((ship) => (ship.parentId = this.id)).length <=
      this.minEscorts
    ) {
      this.currentGun = this.weapons.findIndex(
        (weapon) => weapon.type === "spawner"
      );
    } else {
      this.currentGun = this.weapons.findIndex(
        (weapon) => weapon.type === "gun"
      );
    }
  }

  weapons = [new SmallFighterSpawner(), new Boom()];
}

import { BaseWeapon } from "./base-weapon.js";
import { mapData } from "../state/map-data.js";
import { FastShip } from "../ships/fast.js";

export class ShipSpawner extends BaseWeapon {
  speed = 100;
  reloadSpeed = 50;

  shoot(ship) {
    mapData.ships.push(
      new FastShip({
        ...this.nosePosition(ship),
        speed: this.angledSpeed(ship),
        rotation: ship.rotation,
      })
    );
  }
}

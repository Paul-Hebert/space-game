import { BaseWeapon } from "./base-weapon.js";
import { mapData } from "../state/map-data.js";
import { FastShip } from "../ships/fast.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";

export class ShipSpawner extends BaseWeapon {
  speed = 100;
  reloadSpeed = 50;
  sound = "pop";

  spawnedShip = FastShip;

  shoot(ship) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    mapData.ships.push(
      new this.spawnedShip({
        ...this.nosePosition(ship),
        speed: this.angledSpeed(ship.rotation),
        rotation: ship.rotation,
      })
    );
  }
}

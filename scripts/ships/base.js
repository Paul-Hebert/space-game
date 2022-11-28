import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { random, randomBool, randomItemInArray } from "../math/random.js";
import { Boom } from "../weapons/boom.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { relativePosition } from "../math/relative-position.js";
import { Exhaust } from "../objects/exhaust.js";
import { positionToTail } from "../math/position-to-ship.js";
import { mapData } from "../state/map-data.js";
import { rotatedDraw } from "../graphics/rotated-draw.js";
import { playCustomSound } from "../sound-effects/play-custom-sound.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";
import { Resource } from "../objects/resource.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { playerState } from "../state/player-state.js";
import { SprayBlaster } from "../weapons/spray-blaster.js";
import { HealthUpgrade } from "../upgrades/health-upgrade.js";
import { WeaponUpgrade } from "../upgrades/weapon-upgrade.js";
import { AccelerationSpeedUpgrade } from "../upgrades/acceleration-upgrade.js";
import { MaxSpeedUpgrade } from "../upgrades/max-speed-upgrade.js";
import { TractorBeamUpgrade } from "../upgrades/tractor-beam-upgrade.js";
import { createExplosion } from "../actions/create-explosion.js";
import { drawCircle } from "../graphics/draw-circle.js";
import { mainCtx } from "../graphics/canvas.js";
import { isJumping } from "../actions/hyper-speed-jump.js";
import { ShieldUpgrade } from "../upgrades/shield-upgrade.js";
import { updateShipAngle } from "../math/update-ship-angle.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { frameCount } from "../state/frameCount.js";
import { angleBetweenPoints } from "../math/angle-between-points.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";

let shipId = 0;

export class BaseShip {
  constructor({ x = 0, y = 0, speed = { x: 0, y: 0 }, rotation = 0 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;

    this.currentGun = 0;

    this.id = shipId;
    shipId++;

    this.resources = [];
    for (
      let i = random(0, this.maxResourceCount + 1);
      i <= this.maxResourceCount;
      i++
    ) {
      this.resources.push(new Resource({}));
    }
  }

  draw(context) {
    const { x, y } = relativePosition(this);

    if (this.shields) {
      let shieldOpacity = this.shields / this.maxShields / 3;
      if (isJumping) shieldOpacity /= 5;

      drawCircle(mainCtx, {
        x,
        y,
        radius: (this.size * 3) / 4,
        fill: `hsla(230, 80%, 40%, ${shieldOpacity})`,
        stroke: `hsla(230, 90%, 90%, ${shieldOpacity})`,
      });
    }

    this.weapons[this.currentGun].draw(context, this);

    rotatedDraw(context, { x, y, rotation: this.rotation }, () => {
      context.drawImage(
        this.graphic,
        x - this.size / 2,
        y - this.size / 2,
        this.size,
        this.size
      );
    });
  }

  addExhaust(distance = 10) {
    const exhaustDirection = degreesToRadians(this.rotation + 90);

    mapData.exhaust.push(
      new Exhaust({
        ...positionToTail(this),
        radius: random(this.size / 20, this.size / 10),
        speed: {
          x: Math.cos(exhaustDirection) * distance,
          y: Math.sin(exhaustDirection) * distance,
        },
      })
    );
  }

  engineNoise() {
    playCustomSound({
      duration: random(1000 / 60, 1000 / 30),
      frequency: random(0, 200),
      volume: random(0.8, 1.5) * volumeRelativeToPlayer(this),
      nodeType: "triangle",
    });
  }

  explode() {
    playSoundFile("explosion-2", volumeRelativeToPlayer(this));

    const explosions = createExplosion({ ...this, radius: this.size });

    const resources = this.resources.map((resource) => {
      resource.x = this.x;
      resource.y = this.y;
      resource.speed = {
        x: random(-3, 3),
        y: random(-3, 3),
      };
      return resource;
    });

    if (this.hardCodedUpgrade) {
      playSoundFile("upgrade-dropped");
      resources.push(this.dropHardCodedUpgrade(this.hardCodedUpgrade));
    } else if (randomBool(this.upgradeDropChance)) {
      playSoundFile("upgrade-dropped");

      if (randomBool(this.upgradeIsWeaponChance)) {
        const gun = this.weapons[this.currentGun];

        const playerHasGun = playerState.weapons.find(
          (weapon) => weapon.name === gun.name
        );
        const gunOnMap = mapData.resources.find(
          (resource) =>
            resource.type === "weapon-upgrade" &&
            resource.upgradeDetails.gun.name === gun.name
        );

        if (!playerHasGun && !gunOnMap) {
          resources.push(this.dropWeaponUpgrade(gun));
        } else {
          resources.push(this.dropShipUpgrade());
        }
      } else {
        resources.push(this.dropShipUpgrade());
      }
    }

    return { explosions, resources };
  }

  dropWeaponUpgrade(gun) {
    const gunUpgrade = new Resource({
      x: this.x,
      y: this.y,
      speed: {
        x: random(-3, 3),
        y: random(-3, 3),
      },
      type: "weapon-upgrade",
      upgradeDetails: new WeaponUpgrade(gun),
    });

    gunUpgrade.rotation = random(0, 360);
    gunUpgrade.rotationSpeed = random(-3, 3);

    return gunUpgrade;
  }

  dropShipUpgrade() {
    const shipUpgradeOptions = [
      new HealthUpgrade(),
      new AccelerationSpeedUpgrade(),
      new MaxSpeedUpgrade(),
      new TractorBeamUpgrade(),
    ];
    if (playerState.maxShields) {
      shipUpgradeOptions.push(new ShieldUpgrade());
    }

    return new Resource({
      x: this.x,
      y: this.y,
      speed: {
        x: random(-3, 3),
        y: random(-3, 3),
      },
      type: "ship-upgrade",
      upgradeDetails: randomItemInArray(shipUpgradeOptions),
    });
  }

  dropHardCodedUpgrade({ type, upgradeDetails }) {
    const upgrade = new Resource({
      x: this.x,
      y: this.y,
      speed: {
        x: random(-3, 3),
        y: random(-3, 3),
      },
      type,
      upgradeDetails,
    });

    upgrade.rotation = random(0, 360);
    upgrade.rotationSpeed = random(-3, 3);

    console.log(upgrade);

    return upgrade;
  }

  regenerateShields() {
    if (this.maxShields) {
      this.shields++;
      if (this.shields > this.maxShields) {
        this.shields = this.maxShields;
      }
    }
  }

  update() {
    this.specialBehavior();

    if (frameCount % 10) {
      this.regenerateShields();
    }

    if (this.isFleeing) {
      this.isFleeing = !this.shouldStopFleeing();
    } else {
      this.isFleeing = this.shouldFlee();
    }

    updateShipAngle(this.getTargetAngle(), this);

    if (this.weapons.length > 0) {
      this.changeWeapons();
    }

    if (
      this.isFleeing ||
      this.distanceToPlayer() >
        (this.targetRange.ideal || this.weapons[this.currentGun].range())
    ) {
      this.accelerate();
      this.speed = constrainSpeed(this);
    }

    this.x += this.speed.x;
    this.y += this.speed.y;

    const playerIsShootable =
      this.isAimingTowardsPlayer() && this.playerIsInRange();
    const gunHasInfiniteRange =
      this.weapons[this.currentGun].range() === Infinity;

    if ((playerIsShootable || gunHasInfiniteRange) && playerState.health > 0) {
      this.shoot();
    }
  }

  specialBehavior() {}

  accelerate() {
    const rotationInRadians = degreesToRadians(this.rotation - 90);
    this.speed.x += Math.cos(rotationInRadians) * this.accelerationSpeed;
    this.speed.y += Math.sin(rotationInRadians) * this.accelerationSpeed;

    this.addExhaust();
    this.engineNoise();
  }

  isFleeing = false;

  targetRange = {
    min: 200,
  };
  shouldFlee() {
    return this.distanceToPlayer() < this.targetRange.min;
  }
  shouldStopFleeing() {
    return (
      this.distanceToPlayer() >
      (this.targetRange.ideal || this.weapons[this.currentGun].range() / 2)
    );
  }

  changeWeapons() {
    this.changeWeaponsByRange({});
  }

  changeWeaponsByRange() {
    // TODO: Do this in ship initialization!
    const weaponsByRange = this.weapons.sort((a, b) => {
      return a.range() > b.range();
    });

    for (let i = 0; i < this.weapons.length; i++) {
      if (this.playerIsInRange(weaponsByRange[i].range())) {
        this.currentGun = i;
        break;
      }
    }
  }

  isAimingTowardsPlayer() {
    const targetAngle = this.getAngleToPlayer();
    const acceptableRange = 30;
    return (
      Math.abs(targetAngle - this.rotation) < acceptableRange ||
      Math.abs(targetAngle - this.rotation - 360) < acceptableRange ||
      Math.abs(targetAngle + this.rotation - 360) < acceptableRange
    );
  }

  getAngleToPlayer() {
    return angleBetweenPoints(this, playerState) + 90;
  }

  getTargetAngle() {
    let angle = this.getAngleToPlayer();

    if (this.isFleeing) angle += 180;

    return angle;
  }

  distanceToPlayer() {
    return distanceBetweenPoints(this, playerState);
  }

  playerIsInRange(range = this.weapons[this.currentGun].range()) {
    return this.distanceToPlayer() < range;
  }

  shoot() {
    const gun = this.weapons[this.currentGun];
    if (
      gun.lastShotFrame === 0 ||
      frameCount - gun.lastShotFrame > gun.reloadSpeed
    ) {
      gun.lastShotFrame = frameCount;

      gun.shoot(this);
    }
  }

  graphic = document.getElementById("ship-4");

  health = 200;
  maxHealth = 200;

  size = 80;

  rotationSpeed = 3;
  accelerationSpeed = 0.35;

  weapons = [
    new BaseWeapon(),
    new Pew(),
    new Ray(),
    new Laser(),
    new Boom(),
    new SprayBlaster(),
  ];

  maxSpeed = 10;

  currentGun = 0;

  maxResourceCount = 2;

  upgradeDropChance = 0.25;
}

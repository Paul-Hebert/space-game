import { positionToMapRight } from "../../math/position-to-map-edge.js";
import { FalconShip } from "../../ships/falcon.js";
import { boss } from "../types/boss.js";

export function testBoss() {
  boss({
    ship: new FalconShip(positionToMapRight()),
    heading: "Defeat the Test Boss",
  });
}

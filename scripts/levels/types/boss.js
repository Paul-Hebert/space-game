import { addMessageToQueue } from "../../hud/messaging.js";
import { mapData } from "../../state/map-data.js";
import { completeLevel } from "../levels.js";

export function boss({
  ship,
  heading,
  nextAction = () => {
    completeLevel();
  },
}) {
  mapData.ships.push(ship);

  addMessageToQueue({
    content: `<h3>${heading}</h3>`,
    theme: "danger",
    nextAction: () => {
      // TODO: This isn't working...
      mapData.ships.forEach((ship) => {
        ship.explode();
      });
      mapData.ships = [];
      nextAction();
    },
    boss: ship,
  });
}

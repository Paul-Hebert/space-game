import { PlayerShip } from "../ships/player.js";

export let playerState = new PlayerShip({});

export function resetPlayerState() {
  playerState = new PlayerShip({});
}

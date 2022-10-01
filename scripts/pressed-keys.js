export const pressedKeys = {};

window.addEventListener("keydown", (e) => {
  pressedKeys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  pressedKeys[e.key] = false;
});

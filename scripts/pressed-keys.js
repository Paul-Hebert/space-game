export const pressedKeys = {};

window.addEventListener("keydown", (e) => {
  pressedKeys[e.key] = true;
  console.log(pressedKeys);
});

window.addEventListener("keyup", (e) => {
  pressedKeys[e.key] = false;
});

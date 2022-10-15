export const pressedKeys = {};

window.addEventListener("keydown", (e) => {
  if (e.key === " ") e.preventDefault();
  pressedKeys[e.key] = true;
});

window.addEventListener("keyup", ({ key }) => {
  pressedKeys[key] = false;
});

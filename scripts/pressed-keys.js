export const pressedKeys = {};
export let keysThatHaveBeenPressed = [];

window.addEventListener("keydown", (e) => {
  if (e.key === " ") e.preventDefault();
  pressedKeys[e.key] = true;
  keysThatHaveBeenPressed.push(e.key);
});

window.addEventListener("keyup", ({ key }) => {
  pressedKeys[key] = false;
});

export function resetPressedKeys() {
  keysThatHaveBeenPressed = [];
}

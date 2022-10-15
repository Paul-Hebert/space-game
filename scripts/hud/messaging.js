import { gameLoop } from "../game-loop.js";

const queueEl = document.querySelector(".message-queue");

let messagesInQueue = [];
let currentId = 0;

export function addMessageToQueue({
  content,
  duration = 200,
  exitRequirements = null,
  nextAction = null,
  updateObjective = null,
}) {
  queueEl.innerHTML += `
  <div class="message" id="message-${currentId}">
    ${content}
  </div>
  `;

  messagesInQueue.push({
    content,
    duration,
    exitRequirements,
    nextAction,
    updateObjective,
    id: currentId,
    startingFrame: gameLoop.frameCount,
  });
}

export function updateMessages() {
  messagesInQueue = messagesInQueue.filter(
    ({
      id,
      exitRequirements,
      startingFrame,
      duration,
      nextAction,
      updateObjective,
    }) => {
      const messageEl = document.getElementById(`message-${id}`);
      let stillValid = true;

      const pastDuration = gameLoop.frameCount - startingFrame >= duration;

      if (exitRequirements !== null) {
        if (pastDuration && exitRequirements()) {
          stillValid = false;
        }
      } else if (pastDuration) {
        stillValid = false;
      }

      if (stillValid) {
        if (updateObjective) {
          const objectiveEl = messageEl.querySelector(".objective");
          const newObjectiveText = updateObjective();
          if (objectiveEl.textContent !== newObjectiveText) {
            objectiveEl.textContent = newObjectiveText;
          }
        }
      } else {
        messageEl.classList.add("is-hiding");

        setTimeout(() => {
          messageEl.remove();
          if (nextAction) nextAction();
        }, 500);
      }

      return stillValid;
    }
  );
}

export function removeAllMessages() {
  messagesInQueue = [];
  currentId = 0;
  queueEl.innerHTML = "";
}

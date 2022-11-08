import { gameLoop } from "../game-loop.js";

const queueEl = document.querySelector(".message-queue");

let messagesInQueue = [];
let currentId = 0;

export function addMessageToQueue({
  content,
  duration = 200,
  nextAction = null,
  objectives = null,
}) {
  queueEl.innerHTML += `
  <div class="message" id="message-${currentId}">
    ${content}
    ${buildObjectives(objectives)}
  </div>
  `;

  messagesInQueue.push({
    content,
    duration,
    objectives,
    nextAction,
    id: currentId,
    startingFrame: gameLoop.frameCount,
  });
}

export function updateMessages() {
  messagesInQueue = messagesInQueue.filter(
    ({ id, objectives, startingFrame, duration, nextAction }) => {
      const messageEl = document.getElementById(`message-${id}`);
      let stillValid = true;

      const pastDuration = gameLoop.frameCount - startingFrame >= duration;

      if (objectives !== null) {
        objectives.forEach((objective, i) => {
          if (objective.completed) return;

          if (objective.updateText) {
            const textEl = messageEl.querySelector(".objective__text");
            const newText = objective.updateText();
            if (newText !== textEl.textContent) {
              textEl.textContent = newText;
            }
          }

          if (objective.evaluate()) {
            const objectiveEl = messageEl.querySelector(`[data-id="${i}"]`);
            objectiveEl.classList.add("is-completed");
            objectiveEl
              .querySelector('[type="checkbox"]')
              .setAttribute("checked", true);

            objective.completed = true;
            if (objective.completionAction) objective.completionAction();
          }
        });

        if (!objectives.find((objective) => !objective.completed)) {
          stillValid = false;
        }
      } else if (pastDuration) {
        stillValid = false;
      }

      if (!stillValid) {
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

export function buildObjectives(objectives) {
  if (!objectives) return "";

  return `<ul class="objectives">
    ${objectives
      .map((objective, i) => {
        const isCompleted = objective.evaluate();

        return `
        <li class="objective ${
          isCompleted ? "is-completed" : ""
        }" data-id="${i}">
          <label>
            <input type="checkbox" ${isCompleted ? "checked" : ""} disabled />
            <span class="objective__text">${objective.text}</span>
          </label>
        </li>
      `;
      })
      .join("")}
  </ul>`;
}

export function removeAllMessages() {
  messagesInQueue = [];
  currentId = 0;
  queueEl.innerHTML = "";
}

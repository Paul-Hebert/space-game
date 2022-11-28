import { frameCount } from "../state/frameCount.js";
import { mapData } from "../state/map-data.js";
import autoAnimate from "https://unpkg.com/@formkit/auto-animate@1.0.0-beta.5/index.mjs";

const queueEl = document.querySelector(".message-queue");
autoAnimate(queueEl);

let messagesInQueue = [];
let currentId = 0;

export function addMessageToQueue({
  content,
  boss,
  duration = 200,
  nextAction = null,
  objectives = null,
  dismissText = null,
  theme = null,
}) {
  currentId++;

  queueEl.insertAdjacentHTML(
    "beforeend",
    `
      <div
        class="message ${theme ? `themed ${theme}` : ""}" 
        id="message-${currentId}"
      >
        ${content}
        ${objectives ? buildObjectives(objectives) : ""}
        ${boss ? buildBossObjective(boss) : ""}
        ${
          dismissText
            ? `<div><button class="dismiss-button">${dismissText}</button></div>`
            : ""
        }
      </div>
    `
  );

  const messageEl = queueEl.querySelector(`#message-${currentId}`);

  const dismissButtonEl = messageEl.querySelector(".dismiss-button");

  if (dismissButtonEl) {
    dismissButtonEl.addEventListener("click", () => {
      clearMessage(messageEl);
      nextAction();
    });

    setTimeout(() => {
      dismissButtonEl.focus();
    }, 100);
  }

  messagesInQueue.push({
    content,
    duration,
    objectives,
    boss,
    nextAction,
    id: currentId,
    startingFrame: frameCount,
    dismissText,
  });
}

export function updateMessages() {
  const upcomingActions = [];
  messagesInQueue = messagesInQueue.filter(
    ({
      id,
      objectives,
      startingFrame,
      duration,
      nextAction,
      dismissText,
      boss,
    }) => {
      const messageEl = document.getElementById(`message-${id}`);
      let stillValid = true;

      const pastDuration = frameCount - startingFrame >= duration;

      if (objectives) {
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
      } else if (boss) {
        if (mapData.ships.includes(boss)) {
          updateBossObjective(boss, messageEl);
        } else {
          stillValid = false;
        }
      } else if (pastDuration && !dismissText) {
        stillValid = false;
      }

      if (!stillValid) {
        clearMessage(messageEl);
        if (nextAction) upcomingActions.push(nextAction);
      }

      return stillValid;
    }
  );

  upcomingActions.forEach((upcomingAction) => {
    upcomingAction();
  });
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

export function buildBossObjective(boss) {
  return `
    <div>
      ${
        boss.maxShields
          ? '<div>Shields:<meter class="boss-shields" max="100" value="100"/></div>'
          : ""
      }
      <div>Health: <meter class="boss-health" max="100" value="100"/></div>
    </div>
  `;
}

export function updateBossObjective(boss, messageEl) {
  if (boss.maxShields) {
    messageEl.querySelector(".boss-shields").value =
      (boss.shields / boss.maxShields) * 100;
  }

  messageEl.querySelector(".boss-health").value =
    (boss.health / boss.maxHealth) * 100;
}

export function clearMessage(messageEl) {
  messageEl.remove();
}

export function removeAllMessages() {
  messagesInQueue = [];
  currentId = 0;
  queueEl.innerHTML = "";
}

import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";

const clickHandler = (event) => {
  // get click btn element
  const clickedButtonEl = event.target.closes(".sorting__buttonm");

  // stop function if no click button element
  if (!clickedButtonEl) return;

  // check if intetion is recent or relevant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;
  // sort job items
  if (recent) {
  } else {
  }
};

sortingEl.addEventListener("click", clickHandler);

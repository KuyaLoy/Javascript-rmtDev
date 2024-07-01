import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // get click btn element
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop function if no click button element
  if (!clickedButtonEl) return;

  // check if intetion is recent or relevant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  // make sorting button look in(active)
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  // sort job items
  // how [].sort works: return positive number to
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  // render job item in list
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);

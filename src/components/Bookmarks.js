import {
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
  state,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // dont continue if click was outside the bookmark button

  if (!event.target.className.includes("bookmark")) return;

  // update state
  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  // update bookmark icon
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

const mouseEnterHandler = () => {
  //make bookmarks button look active
  bookmarksBtnEl.classList.add("bookmarks-btn--active");

  // make job list visisible
  jobListBookmarksEl.classList.add("job-list--visible");

  // render bookmark job list
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  //make bookmarks button look inactive
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");

  // make job list invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);

import {
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
  RESULT_PER_PAGE,
  state,
} from "../common.js";

import renderJobList from "./JobList.js";

const renderPaginationButtons = () => {
  //display back button if we are in page 2 ot futher
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  //display next button if there are more job items on next page
  if (state.searchJobItems.length - state.currentPage * RESULT_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  // update pagination numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  // unfocu ('blur) buttons
  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

const clickHandler = (event) => {
  // get clicked button element
  const clickedButtonEl = event.target.closest(".pagination__button");

  // stop function if
  if (!clickedButtonEl) return;

  // check if intention is next or back button
  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  // update state
  nextPage ? state.currentPage++ : state.currentPage--;

  //render pagination buttons
  renderPaginationButtons();

  //render job items for that page
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButtons;

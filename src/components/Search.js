import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
} from "../common.js";

import renderError from "./Error.js";
import renderJobList from "./JobList.js";
import renderSpinner from "./Spinner.js";

const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // valicdation (regular expr ession example)
  const forbiddenPattern = /python/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  // blur input
  searchInputEl.getBoundingClientRect();

  // remove previous job items
  jobListSearchEl.innerHTML = "";

  // render spinner
  renderSpinner("search");

  // fetch search results
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "resource issue (e.g. resource doesn't exist) or server issue"
        );
      }
      return response.json();
    })
    .then((data) => {
      //extract job items
      const { jobItems } = data;

      // remove
      renderSpinner("search");

      //rende number of results
      numberEl.textContent = jobItems.length;

      // render job items in search job list
      renderJobList(jobItems);
    })
    .catch((error) => {
      renderSpinner("search");
      renderError(error.message);
    });
};
searchFormEl.addEventListener("submit", submitHandler);

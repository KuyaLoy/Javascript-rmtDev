import { BASE_API_URL, getData, jobDetailsContentEl } from "../common.js";
import renderError from "./Error.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

const loadHashChangeHandler = async () => {
  // get id from url
  const id = window.location.hash.substring(1);
  if (id) {
    //remove previous job details
    jobDetailsContentEl.innerHTML = "";

    //add spinner
    renderSpinner("job-details");

    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      //extract job details
      const { jobItem } = data;
      // remove spinner
      renderSpinner("job-details");
      //render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);

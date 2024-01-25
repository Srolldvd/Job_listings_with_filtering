import { resultWrapper, getJobTemplate, jobs } from "./getJobs";
import type { jobData } from "./getJobs";
let jobTypes = [];

const filterJobs = (data) => {
  if (jobTypes.indexOf(data) !== -1) {
    return;
  } else {
    jobTypes.push(data);
  }
  console.log(jobTypes);
  /*   return jobs.filter((job: jobData) => {
    if()
  }); */
};

document.addEventListener("click", (e) => {
  const element = e.target;
  element.closest("[data-job-category]")
    ? filterJobs(e.target.getAttribute("data-job-category"))
    : null;
});

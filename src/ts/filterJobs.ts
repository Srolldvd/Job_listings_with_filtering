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
  const filteredJobs = jobs.filter((job: jobData) => {
    if (checker(job.languages, jobTypes)) {
      return true;
    } else {
      return false;
    }
  });

  resultWrapper.innerHTML = "";
  return filteredJobs.forEach((data: jobData) => {
    resultWrapper.innerHTML += getJobTemplate(data);
  });
};

const checker = (arr, target) => target.every((v) => arr.includes(v));

document.addEventListener("click", (e) => {
  const element = e.target;
  element.closest("[data-job-category]")
    ? filterJobs(e.target.getAttribute("data-job-category"))
    : null;
});

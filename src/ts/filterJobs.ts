import { resultWrapper, getJobTemplate, jobs } from "./getJobs";
import type { jobData } from "./getJobs";
let jobTypes: string[] = [];

const filterJobs = (data: string) => {
  if (jobTypes.indexOf(data) !== -1) return;
  jobTypes.push(data);

  console.log(jobTypes);

  const filteredJobs = jobs.filter((job: jobData) => {
    let items = [job.role, job.level, ...job.languages, ...job.tools];
    return jobTypes.every((filter) => items.includes(filter));
  });

  resultWrapper.innerHTML = "";
  return filteredJobs.forEach((data: jobData) => {
    resultWrapper.innerHTML += getJobTemplate(data);
  });
};

document.addEventListener("click", (e) => {
  const element = e.target as HTMLElement;
  element.closest("[data-job-category]")
    ? filterJobs(element.getAttribute("data-job-category"))
    : null;
});

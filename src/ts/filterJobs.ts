import { resultWrapper, getJobTemplate, printJobs, jobs } from "./getJobs";
import type { jobData } from "./getJobs";
const filterElem = document.getElementById("filter") as HTMLDivElement;
const filterWrapperElem = filterElem.parentElement as HTMLDivElement;
let jobTypes: string[] = [];

const filterJobs = (data: string) => {
  if (jobTypes.indexOf(data) !== -1) return;
  jobTypes.push(data);
  printJobTypes(data);

  if (jobTypes.length !== 0) {
    filterWrapperElem.classList.remove("hidden");
    filterWrapperElem.classList.add("flex");
  } else {
    filterWrapperElem.classList.remove("flex");
    filterWrapperElem.classList.add("hidden");
  }

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

const printJobTypes = (filterValue: string) => {
  const wrapperElem = document.createElement("div");
  wrapperElem.classList.add("flex");

  const valueElem = document.createElement("span");
  valueElem.classList.add("bg-secondary", "px-2", "py-1", "rounded-l-md");
  valueElem.textContent = filterValue;
  wrapperElem.appendChild(valueElem);

  const removeBtnElem = document.createElement("span");
  removeBtnElem.className =
    "relative bg-primary w-7 rounded-r-md cursor-pointer hover:bg-accent-300 before:absolute before:inset-0 before:bg-remove before:bg-no-repeat before:bg-center before:h-full";
  removeBtnElem.setAttribute("data-remove-filter", "");
  wrapperElem.appendChild(removeBtnElem);
  filterElem.appendChild(wrapperElem);
};

document.addEventListener("click", (e) => {
  const element = e.target as HTMLElement;
  element.closest("[data-job-category]")
    ? filterJobs(element.getAttribute("data-job-category") as string)
    : null;
  element.closest("[data-remove-filter]") ? removeFilter(e) : null;
  element.closest("[data-clear-filter]") ? clearFilter() : null;
});

export { filterElem };

const clearFilter = () => {
  filterWrapperElem.classList.remove("flex");
  filterWrapperElem.classList.add("hidden");
  jobTypes = [];
  filterElem.innerHTML = "";
  return printJobs();
};

const removeFilter = (e) => {
  const element = e.target;
  const index = jobTypes.indexOf(element.previousElementSibling.textContent);
  if (index === -1) return;
  element.parentElement.remove();
  jobTypes.splice(index, 1);
  printJobs();
};

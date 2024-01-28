import { filterElem } from "./filterJobs";
const resultWrapper = document.getElementById("content") as HTMLElement;
const path = "./../../data.json";
let jobs: jobData[] = [];

export interface jobData {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: [];
  tools: [];
}

const getJobs = async () => {
  const response = await fetch(path);
  const result = await response.json();
  jobs = result;

  printJobs();
};

const printJobs = () => {
  filterElem.innerHTML = "";
  return jobs.forEach((data: jobData) => {
    resultWrapper.innerHTML += getJobTemplate(data);
  });
};

const getJobTemplate = (data: jobData) => {
  return `
  <div class="bg-white rounded-sm w-full py-4 px-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 ${data.featured ? "border-l-4 border-primary" : ""}">
  <div class="-mt-10 sm:mt-0">
    <img src="${data.logo}" alt="company logo" class="max-w-[4rem] sm:max-w-full sm:min-w-[5.5rem]">
  </div>
  <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div class="flex flex-col gap-1">
      <div class="flex gap-2">
        <p class="text-primary font-bold">${data.company}</p>
        ${data.new ? "<span class='text-white rounded-full bg-primary font-bold px-2 py-1 text-xs'>NEW!</span>" : ""}
        ${data.featured ? "<span class='text-white rounded-full bg-accent-300 font-bold px-2 py-1 text-xs'>FEATURED</span>" : ""}
      </div>
      <div>
          <h3 class="text-lg text-accent-300 hover:text-primary font-bold cursor-pointer">${data.position}</h3>
      </div>
      <div>
        <ul class="flex whitespace-nowrap text-accent-200">
          <li>${data.postedAt}</li>
          <li class="list-disc ml-7">${data.contract}</li>
          <li class="list-disc ml-7">${data.location}</li>
        </ul>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 pt-4 text-primary text-sm font-bold sm:justify-end border-t sm:border-0 sm:pt-0">
    <span class="bg-secondary px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white" data-job-category="${data.role}">${data.role}</span>
    <span class="bg-secondary px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white" data-job-category="${data.level}">${data.level}</span>
        ${data.languages.map((language: string) => `<span class="bg-secondary px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white" data-job-category="${language}">${language}</span>`).join("")}
        ${data.tools.map((tool: string) => `<span class="bg-secondary px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white" data-job-category="${tool}">${tool}</span>`).join("")}
    </div>
  </div>
</div>
  `;
};

export { resultWrapper, getJobs, getJobTemplate, printJobs, jobs };

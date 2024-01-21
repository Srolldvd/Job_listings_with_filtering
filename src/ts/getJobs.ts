const resultWrapper = document.getElementById("content") as HTMLElement;
const path = "./../../data.json";

const getJobs = async () => {
  const response = await fetch(path);
  const result = await response.json();

  const getJobTemplate = (data: any) => {
    return `
    <div class="bg-white rounded-sm w-full py-4 px-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4">
    <div class="-mt-10 sm:mt-0">
      <img src="${data.logo}" alt="company logo" class="max-w-[4rem] sm:max-w-full sm:min-w-[5.5rem]">
    </div>
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <p class="text-primary font-bold">${data.company}</p>
          ${data.new ? "<span class='text-white rounded-full bg-primary font-bold px-2 py-1 text-xs'>NEW!</span>" : ""}
          ${data.featured ? "<span class='text-white rounded-full bg-accent-300 font-bold px-2 py-1 text-xs'>FEATURED</span>" : ""}
        </div>
        <div>
            <h3 class="text-accent-300 hover:text-primary font-bold">${data.position}</h3>
        </div>
        <div>
          <ul class="flex whitespace-nowrap text-accent-200">
            <li>${data.postedAt}</li>
            <li class="list-disc ml-7">${data.contract}</li>
            <li class="list-disc ml-7">${data.location}</li>
          </ul>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 pt-4 text-primary font-bold sm:justify-end border-t sm:border-0 sm:pt-0">
          ${data.languages.map((language) => `<span class="bg-secondary px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white">${language}</span>`).join("")}
      </div>
    </div>
  </div>
    `;
  };

  return result.forEach((data) => {
    resultWrapper.innerHTML += getJobTemplate(data);
  });
};

getJobs();

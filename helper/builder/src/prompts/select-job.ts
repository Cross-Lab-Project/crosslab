import inquirer from "inquirer";
import { Job } from "../projects-loader";
import AutocompletePrompt from "inquirer-autocomplete-prompt";
import fuzzy from "fuzzy";

inquirer.registerPrompt("autocomplete", AutocompletePrompt);

export async function selectJobPrompt(jobs: Job[]): Promise<Job> {
  const { job } = await inquirer.prompt({
    type: "autocomplete",
    name: "job",
    message: "Select a job:",
    source: (_: unknown, input = "") => searchScriptName(jobs, input),
  } as { name: "job" });

  return job;
}

function searchScriptName(jobs: Job[], input = "") {
  const scriptNames = jobs.map((job) => job.script);
  const results = fuzzy.filter(input, scriptNames).map((el) => {
    return {
      name: el.original,
      value: jobs.find((job) => job.script === el.original),
    };
  });

  return results;
}

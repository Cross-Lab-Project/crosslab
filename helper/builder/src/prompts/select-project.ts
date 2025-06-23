import inquirer from "inquirer";
import AutocompletePrompt from "inquirer-autocomplete-prompt";
import { Project } from "../projects-loader";
import fuzzy from "fuzzy";

inquirer.registerPrompt("autocomplete", AutocompletePrompt);

export async function selectProjectPrompt(
  projects: Project[]
): Promise<Project> {
  const { project } = await inquirer.prompt({
    type: "autocomplete",
    name: "project",
    message: "Select a project:",
    source: (_: unknown, input: string) => searchProjectName(projects, input),
    loop: false,
  } as { name: "project" });

  return project;
}

async function searchProjectName(projects: Project[], input = "") {
  const projectNames = projects.map((project) => project.name);
  const results = fuzzy.filter(input, projectNames).map((el) => {
    return {
      name: el.original,
      value: projects.find((project) => project.name === el.original),
    };
  });

  return results;
}

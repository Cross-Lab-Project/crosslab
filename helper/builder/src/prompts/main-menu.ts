import inquirer from "inquirer";
import { loadJob, loadProjects } from "../projects-loader";
import { selectProjectPrompt } from "./select-project";
import { selectJobPrompt } from "./select-job";
import { runDependencyGraph, runJob } from "../actions/run-job";
import { clean } from "../actions/clean";
import path from "path";
import { rootDirectory } from "../root-directory";
import { selectJobExecutionPrompt } from "./select-job-execution";
import { DependencyGraph, buildDependencyGraph } from "../dependency-graph";

export async function mainMenu() {
  const projects = loadProjects();

  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    loop: false,
    message: "Select an action:",
    choices: [
      "run specific job",
      "clean project build files",
      "build all",
      "execute all jobs",
    ],
  });

  switch (action) {
    case "run specific job": {
      const project = await selectProjectPrompt(projects);
      const job = await selectJobPrompt(project.jobs);
      const execution = await selectJobExecutionPrompt();
      await runJob(job, projects, execution);
      break;
    }
    case "clean project build files": {
      const project = await selectProjectPrompt(projects);
      await clean(path.resolve(rootDirectory, project.name));
      break;
    }
    case "build all": {
      const projects = loadProjects();
      const jobs = projects.flatMap((project) =>
        project.jobs.filter((job) => job.script === "build")
      );
      const dependencyGraph = buildDependencyGraph(jobs, projects);
      const execution = await selectJobExecutionPrompt();
      await runDependencyGraph(dependencyGraph, projects, execution);
      break;
    }
    case "execute all jobs": {
      const projects = loadProjects();
      const jobs = projects.flatMap((project) => project.jobs);
      const dependencyGraph = buildDependencyGraph(jobs, projects);
      const execution = await selectJobExecutionPrompt();
      await runDependencyGraph(dependencyGraph, projects, execution);
      break;
    }
  }
}

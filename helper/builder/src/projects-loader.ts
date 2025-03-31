import fs from "fs";
import yaml from "js-yaml";

export type Job = {
  project: string;
  title: string;
  script: string;
  paths?: string[];
  dependencies?: string[];
  tags?: string[];
};

export type Project = {
  name: string;
  jobs: Job[];
};

type JobPrototype = {
  script: string;
  dependencies?: string[];
};

type ProjectsDictionary = {
  [k: string]: JobPrototype[];
};

export function loadProjects(): Project[] {
  const jobsFile = fs.readFileSync("../../.jobs.yml", { encoding: "utf-8" });
  const projectsPrototype = yaml.load(jobsFile) as ProjectsDictionary;
  const projects: Project[] = [];

  for (const projectName of Object.keys(projectsPrototype)) {
    projects.push({
      name: projectName,
      jobs: [
        ...projectsPrototype[projectName].map((job) => {
          return {
            title: `${projectName}:${job.script}`,
            project: projectName,
            ...job,
          };
        }),
      ],
    });
  }

  return projects;
}

export function loadJob(jobTitle: string, projects: Project[]): Job {
  const [projectName, script] = jobTitle.split(":");

  const result = projects
    .find((project) => project.name === projectName)
    ?.jobs.find((job) => job.script === script);

  if (!result) throw new Error(`could not load job "${jobTitle}"`);

  return result;
}

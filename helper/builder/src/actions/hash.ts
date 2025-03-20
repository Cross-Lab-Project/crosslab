import { execSync } from "child_process";
import { DependencyGraph } from "../dependency-graph";
import path from "path";
import { rootDirectory } from "../root-directory";
import { Job } from "../projects-loader";
import fs from "fs";

export function hash(job: Job, dependencyGraph: DependencyGraph): string {
  const paths = [
    ...(job.paths
      ? job.paths.map((p) => path.resolve(rootDirectory, job.project, p))
      : [path.resolve(rootDirectory, job.project)]),
    path.resolve(rootDirectory, job.project, `scripts/${job.script}.sh`),
  ];

  for (const dependency of dependencyGraph.getDependencies(`${job.title}`)) {
    const [dependencyProject, dependencyScript] = dependency.split(":");
    const dependencyPath = path.resolve(
      rootDirectory,
      dependencyProject,
      `dist/${dependencyScript}.hash`
    );
    if (fs.existsSync(dependencyPath)) paths.push(dependencyPath);
  }

  return execSync(
    `bash ${rootDirectory}/scripts/helper.d/path_hash.sh -p ${paths.join(
      " -p "
    )}`,
    { encoding: "utf-8" }
  );
}

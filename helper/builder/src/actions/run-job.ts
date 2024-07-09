import chalk from "chalk";
import path from "path";
import { DependencyGraph, buildDependencyGraph } from "../dependency-graph";
import { Job, Project, loadJob } from "../projects-loader";
import fs from "fs";
import { clean } from "./clean";
import { rootDirectory } from "../root-directory";
import { hash } from "./hash";
import { runSetScene } from "../helper/run-set-scene";
import { runScript } from "../helper/run-script";
import { getHash } from "../helper/get-hash";
import { getStatus } from "../helper/get-status";
import { RunningJob, renderExecution } from "../helper/render-execution";

export async function runJob(
  job: Job,
  projects: Project[],
  execution: "clean" | "normal" | "retry"
) {
  const dependencyGraph = buildDependencyGraph([job], projects);
  return await _run(dependencyGraph, projects, execution);
}

export async function runDependencyGraph(
  dependencyGraph: DependencyGraph,
  projects: Project[],
  execution: "clean" | "normal" | "retry"
) {
  return _run(dependencyGraph, projects, execution);
}

async function _run(
  dependencyGraph: DependencyGraph,
  projects: Project[],
  execution: "clean" | "normal" | "retry"
) {
  const runningJobs: RunningJob[] = [];
  const stopRender = renderExecution(runningJobs, dependencyGraph);

  await dependencyGraph.invert().traverse(async (node, abort) => {
    const currentJob = loadJob(node, projects);
    if (
      !abort &&
      (execution === "clean" ||
        (execution === "retry" && getStatus(currentJob) === "failed") ||
        (execution === "normal" &&
          getHash(currentJob) !== hash(currentJob, dependencyGraph)))
    )
      await clean(
        path.resolve(rootDirectory, currentJob.project),
        currentJob.script
      );

    return true;
  });

  await dependencyGraph.invert().traverse(async (node, abort) => {
    const currentJob = loadJob(node, projects);
    const projectPath = path.resolve(rootDirectory, currentJob.project);
    const distPath = path.resolve(projectPath, "dist");
    const statusPath = path.resolve(distPath, `${currentJob.script}.status`);
    const hashPath = path.resolve(distPath, `${currentJob.script}.hash`);
    const logPath = path.resolve(distPath, `${currentJob.script}.log`);
    const badgePath = path.resolve(distPath, `${currentJob.script}.badge`);

    fs.rmSync(badgePath, { force: true });
    fs.rmSync(logPath, { force: true });
    if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);

    const runningJob = {
      project: currentJob.project,
      script: currentJob.script,
      status: abort ? chalk.yellow("aborted") : "running",
    };
    runningJobs.push(runningJob);

    if (abort) return false;

    const status =
      getHash(currentJob) === hash(currentJob, dependencyGraph)
        ? `skipped (${getStatus(currentJob)})`
        : await runScript(currentJob, logPath);

    switch (status) {
      case "success":
        runningJob.status = chalk.green("success");
        break;
      case "failed":
        runningJob.status = chalk.red("failed");
        break;
      case "skipped (success)":
        runningJob.status = chalk.green("skipped (success)");
        break;
      case "skipped (failed)":
        runningJob.status = chalk.red("skipped (failed)");
        break;
      case "aborted":
        runningJob.status = chalk.yellow("aborted");
        break;
      default:
        runningJob.status = chalk.gray(status);
    }

    if (
      fs.existsSync(
        path.resolve(rootDirectory, currentJob.project, "scripts/set-scene.sh")
      )
    )
      await runSetScene(currentJob.project);

    if (status !== "aborted" && !status.includes("skipped")) {
      fs.writeFileSync(
        statusPath,
        status.includes("success") ? "success" : "failed"
      );
      fs.writeFileSync(hashPath, hash(currentJob, dependencyGraph));
    }
    return status.includes("success");
  });

  await new Promise<void>((resolve) => setTimeout(resolve, 150));

  stopRender();
}

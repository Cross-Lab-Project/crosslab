import { terminal } from "terminal-kit";
import { DependencyGraph } from "../dependency-graph";

export type RunningJob = { project: string; script: string; status: string };

export function renderExecution(
  runningJobs: RunningJob[],
  dependencyGraph: DependencyGraph
): () => void {
  const status = { x: 0 };
  const loadingInterval = loadingAnimation(status);
  const chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"];
  let maxLength = 0;
  dependencyGraph.nodes.forEach((n) => {
    if (n.length > maxLength) maxLength = n.length;
  });

  let printedJobs = 0;

  const interval = setInterval(() => {
    const up = printedJobs;
    up > 0 && terminal.up(up);
    terminal.eraseDisplayBelow();
    terminal.blue(
      `Running: ${
        runningJobs.filter((job) => job.status === "running").length
      }, Success: ${
        runningJobs.filter((job) => job.status.includes("success")).length
      }, Failed: ${
        runningJobs.filter((job) => job.status.includes("failed")).length
      }\n`
    );
    for (const runningJob of runningJobs) {
      if (runningJob.status === "running")
        terminal.blue(
          `Executing "${runningJob.project}:${runningJob.script}" ${" ".repeat(
            maxLength - runningJob.project.length - runningJob.script.length + 1
          )} ${
            runningJob.status === "running"
              ? chars[status.x]
              : runningJob.status
          }\n`
        );
    }
    printedJobs =
      runningJobs.filter((job) => job.status === "running").length + 1;
  }, 100);

  return () => {
    clearInterval(interval);
    clearInterval(loadingInterval);
    runningJobs
      .filter((job) => job.status.includes("failed"))
      .forEach((job) =>
        terminal.red(`Job ${job.project}:${job.script} failed!\n`)
      );
  };
}

function loadingAnimation(status: { x: number }, delay = 200) {
  status.x = 0;

  const chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"];

  return setInterval(function () {
    status.x++;
    status.x = status.x % chars.length;
  }, delay);
}

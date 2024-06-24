import { spawn } from "child_process";
import path from "path";
import { rootDirectory } from "../root-directory";
import fs from "fs";
import { Job } from "../projects-loader";
import { addProcess } from "./sigint-handler";

export async function runScript(
  job: Job,
  logPath: string
): Promise<"success" | "failed" | "skipped" | "aborted"> {
  const childProcess = spawn("bash", [`scripts/${job.script}.sh`], {
    cwd: path.resolve(rootDirectory, job.project),
    detached: true,
  });

  return new Promise<"success" | "failed" | "skipped" | "aborted">(
    (resolve) => {
      addProcess(childProcess, () => resolve("aborted"));
      childProcess.on("error", () => {
        resolve("failed");
      });
      childProcess.on("exit", () => {
        resolve(childProcess.exitCode === 0 ? "success" : "failed");
      });
      childProcess.stdout.on("data", (data) => {
        fs.appendFileSync(logPath, data);
      });
      childProcess.stderr.on("data", (data) => {
        fs.appendFileSync(logPath, data);
      });
    }
  );
}

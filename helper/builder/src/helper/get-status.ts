import fs from "fs";
import path from "path";
import { rootDirectory } from "../root-directory";
import { Job } from "../projects-loader";

export function getStatus(job: Job): string | undefined {
  const statusPath = path.resolve(
    rootDirectory,
    job.project,
    `dist/${job.script}.status`
  );

  if (fs.existsSync(statusPath)) {
    return fs
      .readFileSync(statusPath, { encoding: "utf-8" })
      .replace(/\s/g, "");
  }

  return undefined;
}

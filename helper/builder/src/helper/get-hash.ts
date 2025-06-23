import fs from "fs";
import path from "path";
import { rootDirectory } from "../root-directory";
import { Job } from "../projects-loader";

export function getHash(job: Job): string | undefined {
  const hashPath = path.resolve(
    rootDirectory,
    job.project,
    `dist/${job.script}.hash`
  );

  if (fs.existsSync(hashPath)) {
    return fs.readFileSync(hashPath, { encoding: "utf-8" });
  }

  return undefined;
}

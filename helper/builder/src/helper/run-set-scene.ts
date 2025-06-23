import { spawn } from "child_process";
import path from "path";
import { rootDirectory } from "../root-directory";
import { addProcess } from "./sigint-handler";

export async function runSetScene(project: string) {
  const setSceneProcess = spawn("bash", [`scripts/set-scene.sh`], {
    cwd: path.resolve(rootDirectory, project),
    detached: true,
  });

  addProcess(setSceneProcess);

  return new Promise<boolean>((resolve) => {
    setSceneProcess.on("error", () => {
      resolve(false);
    });
    setSceneProcess.on("exit", () => {
      resolve(setSceneProcess.exitCode === 0);
    });
  });
}

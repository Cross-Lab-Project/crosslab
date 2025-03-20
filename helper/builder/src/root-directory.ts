import path from "path";

function resolveRootDirectory() {
  let currentDir = path.resolve("");
  let i = 1;

  while (!currentDir.endsWith("crosslab")) {
    if (currentDir === "/")
      throw new Error("Expected root directory with name 'crosslab'");
    currentDir = path.resolve("../".repeat(i++));
  }

  return currentDir;
}

export const rootDirectory = resolveRootDirectory();

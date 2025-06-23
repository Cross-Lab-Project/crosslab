import path from "path";
import fs from "fs";
import { execSync } from "child_process";

export async function clean(directoryPath: string, script?: string) {
  const directory = fs.readdirSync(directoryPath);
  const foldersToDelete = ["node_modules", "dist", "build"];
  const packageBakPath = path.resolve(directoryPath, "package.bak");
  const packageJsonPath = path.resolve(directoryPath, "package.json");
  const packageResolvedJsonPath = path.resolve(
    directoryPath,
    "package.resolved.json"
  );

  for (const item of directory) {
    const itemPath = path.resolve(directoryPath, item);
    const stat = fs.statSync(itemPath);

    if (!stat.isDirectory()) continue;

    if (foldersToDelete.includes(item)) {
      if (item !== "dist") {
        try {
          fs.rmSync(itemPath, { recursive: true, force: true });
        } catch (error) {
          if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === "EACCES"
          )
            execSync(`sudo rm -rf ${itemPath}`);
        }
        continue;
      }

      for (const file of fs.readdirSync(path.resolve(directoryPath, item))) {
        if (file.startsWith(script ? `${script}.` : ""))
          fs.rmSync(path.resolve(directoryPath, item, file), { force: true });
      }
    }
  }

  if (
    fs.existsSync(packageResolvedJsonPath) &&
    fs.existsSync(packageBakPath) &&
    fs.existsSync(packageJsonPath)
  ) {
    const packageJson = fs.readFileSync(packageJsonPath, { encoding: "utf-8" });
    const packageResolvedJson = fs.readFileSync(packageResolvedJsonPath, {
      encoding: "utf-8",
    });

    if (packageJson === packageResolvedJson) {
      fs.renameSync(packageBakPath, packageJsonPath);
    }

    fs.rmSync(packageResolvedJsonPath);
  }
}

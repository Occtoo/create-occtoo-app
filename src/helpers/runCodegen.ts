import { execa } from "execa";
import { getUserPkgManager } from "~/utils/getPackageManager.js";

export const runCodegen = async ({ projectDir }: { projectDir: string }) => {
  const pkgManager = getUserPkgManager();
  await execa(pkgManager, ["run", "codegen"], {
    cwd: projectDir,
    stdout: "inherit",
  });
};

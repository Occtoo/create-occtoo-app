import { execa } from "execa";
import { getUserPkgManager } from "~/utils/getPackageManager.js";

export const installDependencies = async ({
  projectDir,
}: {
  projectDir: string;
}) => {
  const pkgManager = getUserPkgManager();

  switch (pkgManager) {
    case "npm":
      await execa(pkgManager, ["install"], {
        cwd: projectDir,
        stderr: "inherit",
      });

      return null;
    case "pnpm":
      await execa(pkgManager, ["install"], {
        cwd: projectDir,
        stderr: "inherit",
      });

      return null;
    case "yarn":
      await execa(pkgManager, ["install"], {
        cwd: projectDir,
        stderr: "inherit",
      });

      return null;
    case "bun":
      await execa(pkgManager, ["install"], { stdout: "ignore" });

      return null;
  }
};

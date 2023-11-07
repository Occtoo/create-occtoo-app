#!/usr/bin/env node
import { select, text } from "@clack/prompts";
import chalk from "chalk";
import fse from "fs-extra";
import ora from "ora";
import path from "path";
import { installDependencies } from "./helpers/installDependencies.js";
import { runCodegen } from "./helpers/runCodegen.js";
import { PKG_ROOT, ASCII_LOGO } from "./consts.js";

const main = async () => {
  const CURR_DIR = process.cwd();
  const templatesDir = path.join(PKG_ROOT, "template");
  const templates = fse.readdirSync(templatesDir);

  if (!templates.length) {
    console.error("Templates folder is empty.");
    process.exit(0);
  }

  console.log(chalk.rgb(255, 255, 255).bold(ASCII_LOGO));

  const dir = await text({
    message: "Enter app name:",
    placeholder: "my-occtoo-app",
    initialValue: "",
    validate(value) {
      if (value.length === 0) return `Value cannot be empty. Please try again.`;
    },
  });

  const template = await select({
    message: "What template would you like to use?",
    options: templates.map((t) => ({
      value: t,
      label: t,
    })),
    initialValue: templates[0],
  });

  const destinationUrl = await text({
    message: "Enter Occtoo destination url:",
    placeholder:
      "https://global.occtoo.com/<project>/<destination>/<version>/openapi",
    initialValue: "",
    validate(value) {
      if (
        value.length === 0 ||
        !value.includes("global.occtoo.com") ||
        !value.endsWith("openapi")
      )
        return `Value is not supported! Please try again.`;
    },
  });

  const source = path.join(templatesDir, template.toString());
  const destination = path.join(CURR_DIR, dir.toString());

  // copy files
  const spinner = ora(`Copying files...`).start();
  await fse.copy(source, destination).catch((err) => console.error(err));

  // update package.json
  const destinationApiDocsUrl = destinationUrl.toString().endsWith("openapi")
    ? destinationUrl.toString()
    : destinationUrl.toString() + "/openapi";
  const packageJsonPath = path.join(destination, "package.json");
  const packageJson = await fse.readJson(packageJsonPath);
  packageJson.scripts.codegen = `openapi --input ${destinationApiDocsUrl} --output ./src/generated`;
  await fse.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  // install dependencies
  spinner.text = "Installing dependencies...";
  await installDependencies({ projectDir: destination });

  // run codegen
  spinner.text = "Running codegen...";
  await runCodegen({ projectDir: destination });

  spinner.succeed(
    chalk
      .rgb(255, 255, 255)
      .bold(`Successfully created project in folder ${destination}\n`),
  );

  console.log(
    chalk
      .rgb(255, 255, 255)
      .bold(`🚀 Run 'cd ${destination} && npm run dev' to start the project`),
  );
};

main().catch((err) => {
  console.error("Aborting installation...");
  if (err instanceof Error) {
    console.error(err);
  } else {
    console.error(
      "An unknown error has occurred. Please open an issue on github with the below:",
    );
    console.log(err);
  }
  process.exit(1);
});

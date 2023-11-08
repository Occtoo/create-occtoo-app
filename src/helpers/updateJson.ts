import fse from "fs-extra";
import _ from "lodash";

export const updateJson = async ({
  path,
  properties,
}: {
  path: string;
  properties: Record<string, string>[];
}) => {
  const packageJson = await fse.readJson(path);

  properties.forEach((property) => {
    _.set(packageJson, property.key, property.value);
  });

  await fse.writeJson(path, packageJson, { spaces: 2 });
};

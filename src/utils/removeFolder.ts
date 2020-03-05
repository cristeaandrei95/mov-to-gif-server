import * as fs from "fs-extra";

export default async folder => {
  try {
    await fs.remove(folder);
  } catch (err) {
    console.error(err);
  }
};

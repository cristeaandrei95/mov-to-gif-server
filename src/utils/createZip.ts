import * as fs from "fs";
import archiver from "archiver";

export default (inputPath, outputPath) =>
  new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }
    });

    output.on("close", () => {
      resolve(archive.pointer());
    });

    archive.on("warning", err => {
      if (err.code === "ENOENT") {
        // I should log warning here
      } else {
        reject(err);
      }
    });

    archive.on("error", err => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(inputPath, false);
    archive.finalize();
  });

const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");

const readDir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const execShell = util.promisify(exec);

module.exports = {
  readDir,
  mkdir,
  execShell
};

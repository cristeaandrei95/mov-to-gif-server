import * as fs from "fs";
import * as util from "util";
import { exec } from "child_process";

export const readDir = util.promisify(fs.readdir);
export const mkdir = util.promisify(fs.mkdir);
export const execShell = util.promisify(exec);

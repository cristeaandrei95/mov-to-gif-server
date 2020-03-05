import * as fs from "fs";
import * as path from "path";
import * as nanoid from "nanoid";
import * as dotenv from "dotenv";
import createZip from "../../utils/createZip";
import removeFolder from "../../utils/removeFolder";
import { readDir, mkdir, execShell } from "../../utils/promisified";

dotenv.config();

const UPLOAD_DIR = path.join(
  __dirname,
  "..",
  "..",
  "..",
  process.env.UPLOAD_DIR
);
const OUTPUT_DIR = path.join(
  __dirname,
  "..",
  "..",
  "..",
  process.env.OUTPUT_DIR
);

const filesPath = ticketID => path.join(UPLOAD_DIR, ticketID);
const outputPath = ticketID => path.join(OUTPUT_DIR, `${ticketID}.zip`);

export const heartbeat = (request, reply) => {
  reply.code(200).send("OK");
};

export const getTicket = async (request, reply) => {
  const ticketID = nanoid();

  await mkdir(filesPath(ticketID));
  reply.send({ ticketID });
};

export const uploadFiles = async (request, reply) => {
  const { ticketID } = request.params;
  const files = request.raw.files;
  const limit = 10;

  if (!ticketID) {
    throw new Error("Invalid ticket");
  }

  if (Object.keys(files).length > limit) {
    return reply.code(400).send("Number of uploaded files exceeds limit");
  }

  if (!fs.existsSync(filesPath(ticketID))) {
    return reply.code(400).send("Invalid ticketID");
  }

  for (let key in files) {
    await files[key].mv(path.join(filesPath(ticketID), files[key].name));
  }

  reply.code(204).send();
};

export const convertFiles = async (request, reply) => {
  const { ticketID } = request.params;
  const excludedFiles = [".DS_Store"];

  if (!ticketID) {
    throw new Error("Invalid ticket");
  }

  if (!fs.existsSync(filesPath(ticketID))) {
    return reply.code(400).send("Invalid ticketID");
  }

  const fileNames = await readDir(filesPath(ticketID));
  const tempPath = path.join(filesPath(ticketID), "temp");

  await mkdir(tempPath);

  const filteredItems = fileNames.filter(item => !excludedFiles.includes(item));
  const filesCollection = filteredItems.map(async fileName => {
    const extension = path.extname(fileName);
    const name = path.basename(fileName, extension);
    const input = path.join(filesPath(ticketID), fileName);
    const output = path.join(tempPath, `${name}.gif`);

    await execShell(`gifify "${input}" -o "${output}" --resize 800:-1`);
  });

  await Promise.all(filesCollection);

  const archiveSize = await createZip(tempPath, outputPath(ticketID));

  reply.send({ ticketID, archiveSize });

  removeFolder(filesPath(ticketID));
};

export const getFiles = async (request, reply) => {
  const { ticketID } = request.params;

  if (!ticketID) {
    throw new Error("Invalid ticket");
  }

  if (!fs.existsSync(outputPath(ticketID))) {
    reply.code(404).send("File not found");
  }
  const stream = fs.createReadStream(outputPath(ticketID));
  reply.type("application/zip").send(stream);
};

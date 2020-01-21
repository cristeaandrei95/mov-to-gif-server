const fs = require("fs");
const path = require("path");
const fastify = require("fastify")({
  logger: false
});
const fileUpload = require("fastify-file-upload");
const nanoid = require("nanoid");
const createZip = require("./utils/createZip");
const removeFolder = require("./utils/removeFolder");
const { readDir, mkdir, execShell } = require("./utils/promisified.js");

const UPLOAD_DIR = path.join(__dirname, "uploads");
const OUTPUT_DIR = path.join(__dirname, "output");
const filesPath = ticketID => path.join(UPLOAD_DIR, ticketID);
const outputPath = ticketID => path.join(OUTPUT_DIR, `${ticketID}.zip`);

// REGISTER MIDDLEWARE 
fastify.register(fileUpload);
fastify.register(require("fastify-cors"), {
  origin: "http://localhost:3000"
});

// CREATE BASE DIRS
if (!fs.existsSync(UPLOAD_DIR)) {
  mkdir(UPLOAD_DIR);
}

if (!fs.existsSync(OUTPUT_DIR)) {
  mkdir(OUTPUT_DIR);
}

// ROUTES
fastify.get("/api/v1/ticket", async (req, res) => {
  const ticketID = nanoid();
  
  await mkdir(filesPath(ticketID));
  res.send({ ticketID });
});

fastify.post("/api/v1/upload-files", async function(req, res) {
  const { ticketID } = req.body;
  const files = req.raw.files;
  const limit = 10;

  if (Object.keys(files).length > limit) {
    return res.code(400).send("Number of uploaded files exceeds limit");
  }

  if (!fs.existsSync(filesPath(ticketID))) {
    return res.code(400).send("Invalid ticketID");
  }

  for (key in files) {
    await files[key].mv(path.join(filesPath(ticketID), files[key].name));
  }

  res.code(204).send();
});

fastify.get("/api/v1/convert", async function(req, res) {
  const { ticketID } = req.query;
  const excludedFiles = [".DS_Store"];

  if (!fs.existsSync(filesPath(ticketID))) {
    return res.code(400).send("Invalid ticketID");
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

  res.send({ ticketID, archiveSize });

  removeFolder(filesPath(ticketID));
});

fastify.get("/api/v1/download/:ticketID", async (req, res) => {
  const { ticketID } = req.params;

  if (!fs.existsSync(outputPath(ticketID))) {
    res.code(404).send("File not found");
  }

  const stream = fs.createReadStream(outputPath(ticketID));

  res.type("application/zip").send(stream);
});

fastify.listen(3001, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});

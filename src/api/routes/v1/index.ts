export default async function(fastify, opts, done) {
  fastify.get("/", async function(request, reply) {
    return { hello: "World" };
  });

  fastify.post("/files/:id", async (request, reply) => {
    return { hello: "files" };
  });

  fastify.get("/files/:id", async (request, reply) => {});

  done();
}

// import * as fastify from "fastify";

// const router = fastify()
//   // ROUTES
//   .app.get("/api/v1/ticket", async (req, res) => {
//     const ticketID = nanoid();

//     await mkdir(filesPath(ticketID));
//     res.send({ ticketID });
//   });

// app.post("/api/v1/upload-files", async function(req, res) {
//   const { ticketID } = req.body;
//   const files = req.raw.files;
//   const limit = 10;

//   if (Object.keys(files).length > limit) {
//     return res.code(400).send("Number of uploaded files exceeds limit");
//   }

//   if (!fs.existsSync(filesPath(ticketID))) {
//     return res.code(400).send("Invalid ticketID");
//   }

//   for (let key in files) {
//     await files[key].mv(path.join(filesPath(ticketID), files[key].name));
//   }

//   res.code(204).send();
// });

// app.get("/api/v1/convert", async function(req, res) {
//   const { ticketID } = req.query;
//   const excludedFiles = [".DS_Store"];

//   if (!fs.existsSync(filesPath(ticketID))) {
//     return res.code(400).send("Invalid ticketID");
//   }

//   const fileNames = await readDir(filesPath(ticketID));
//   const tempPath = path.join(filesPath(ticketID), "temp");

//   await mkdir(tempPath);

//   const filteredItems = fileNames.filter(item => !excludedFiles.includes(item));
//   const filesCollection = filteredItems.map(async fileName => {
//     const extension = path.extname(fileName);
//     const name = path.basename(fileName, extension);
//     const input = path.join(filesPath(ticketID), fileName);
//     const output = path.join(tempPath, `${name}.gif`);

//     await execShell(`gifify "${input}" -o "${output}" --resize 800:-1`);
//   });

//   await Promise.all(filesCollection);

//   const archiveSize = await createZip(tempPath, outputPath(ticketID));

//   res.send({ ticketID, archiveSize });

//   removeFolder(filesPath(ticketID));
// });

// app.get("/api/v1/download/:ticketID", async (req, res) => {
//   const { ticketID } = req.params;

//   if (!fs.existsSync(outputPath(ticketID))) {
//     res.code(404).send("File not found");
//   }

//   const stream = fs.createReadStream(outputPath(ticketID));

//   res.type("application/zip").send(stream);
// });

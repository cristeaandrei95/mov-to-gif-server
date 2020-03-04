import createServer from "./server";

const server = createServer({
  logSeverity: "info"
});

// import * as fs from "fs";
// import * as path from "path";
// import * as fastify from "fastify";
// import fileUpload from "fastify-file-upload";
// import nanoid from "nanoid";
// import createZip from "./utils/createZip";
// import removeFolder from "./utils/removeFolder";
// import { readDir, mkdir, execShell } from "./utils/promisified";
// import * as fastifyCors from "fastify-cors";

// const UPLOAD_DIR = path.join(__dirname, "uploads");
// const OUTPUT_DIR = path.join(__dirname, "output");
// const filesPath = ticketID => path.join(UPLOAD_DIR, ticketID);
// const outputPath = ticketID => path.join(OUTPUT_DIR, `${ticketID}.zip`);

// const app = fastify({
//   logger: false
// });

// // REGISTER MIDDLEWARE
// app.register(fileUpload);
// app.register(fastifyCors, {
//   origin: "http://localhost:3000"
// });

// // CREATE BASE DIRS
// if (!fs.existsSync(UPLOAD_DIR)) {
//   mkdir(UPLOAD_DIR);
// }

// if (!fs.existsSync(OUTPUT_DIR)) {
//   mkdir(OUTPUT_DIR);
// }

// app.listen(3001, (err, address) => {
//   if (err) throw err;
//   fastify.log.info(`server listening on ${address}`);
// });

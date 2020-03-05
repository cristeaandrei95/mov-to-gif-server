import {
  heartbeat,
  getTicket,
  uploadFiles,
  getFiles,
  convertFiles
} from "../../controllers";

export default function(fastify, opts, done) {
  fastify.get("/heartbeat", heartbeat);
  fastify.get("/ticket", getTicket);
  fastify.get("/files/:ticketID", getFiles);
  fastify.get("/files/:ticketID/convert", convertFiles);
  fastify.post("/files/:ticketID", uploadFiles);
  done();
}

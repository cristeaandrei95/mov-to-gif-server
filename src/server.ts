import * as fastify from "fastify";
import * as path from "path";
import routes from "./api/routes/v1/";

const port = Number(process.env.PORT) || 3000;

const createServer = options => {
  const { logSeverity } = options;
  // create the server
  const server = fastify({
    ignoreTrailingSlash: true,
    logger: {
      level: logSeverity
    }
  });

  server.register(routes, { prefix: "api/v1" });

  // start the server
  server.listen(port, err => {
    if (err) {
      server.log.error(err);
      console.log(err);
      process.exit(1);
    }
    server.log.info("Server Started");
  });
};

export default createServer;

import fastify from "fastify";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cors from "@fastify/cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config();

const httpsOptions = {
  key: fs.readFileSync(
    path.join(__dirname, "..", "https", "fastify.localhost.key"),
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "..", "https", "fastify.localhost.cert"),
  ),
};

const server = fastify({
  http2: true,
  https: httpsOptions,
});

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

// Declare a route
server.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
server.listen({ host: "0.0.0.0", port: 8443 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log(`Server is now listening on ${address}`);
});

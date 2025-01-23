import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
dotenv.config();

const server = fastify();

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
server.listen(
  { port: process.env.PORT ? Number(process.env.PORT) : 3001, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
  },
);

import fastify from "fastify";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cors from "@fastify/cors";
import { fileURLToPath } from "url";
import {
  BoardState,
  Game,
  GameState,
} from "../../../packages/shared/types/gameState";
import {
  getBoardStateFromString,
  initGameState,
  initGame,
  checkBoardStateConsistency,
} from "../../../packages/shared/lib/connect4";

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

let games: Game[] = new Array<Game>();

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

server.post("/game", function (request, reply) {
  const { state } = request.query as { state?: string };

  const boardState: BoardState | undefined = getBoardStateFromString(state);

  try {
    if (boardState !== undefined) {
      checkBoardStateConsistency(boardState);
    }
  } catch (e) {
    reply.status(400).send({ error: `Invalid state parameter - ${e}` });
    return;
  }

  const gameState: GameState = initGameState(boardState);

  const game: Game = initGame(games.length + 1, gameState, state);
  games.push(game);

  reply.send(game);
});

server.get("/game/:id", function (request, reply) {
  const { id } = request.params as { id: string };

  const game = games.find((g) => g.id === parseInt(id));

  if (!game) {
    reply.code(404).send({ error: "Game not found" });
    return;
  }

  reply.send(game);
});

// Run the server!
server.listen({ host: "0.0.0.0", port: 8443 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log(`Server is now listening on ${address}`);
});

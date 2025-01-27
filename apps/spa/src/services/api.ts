import {
  Game,
  GameStateVersionResponse,
} from "../../../../packages/shared/types/gameState";

export type ApiResponse = {
  hello: string;
};

const backendUrl = import.meta.env.VITE_REST_API_URL || "http://localhost:3000";
const gamePath = "/game";
const playtokenPath = "/playtoken";
const gameStateVersion = "/stateVersion";

export const createGame = async (state: string | null): Promise<Game> => {
  const gameUrl = `${backendUrl}${gamePath}`;
  const url = state ? `${gameUrl}?state=${encodeURIComponent(state)}` : gameUrl;

  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    const errorText = await JSON.parse(await response.text());
    throw new Error(`Failed to create a game : ${errorText.error}`);
  }

  return await response.json();
};

export const getGame = async (gameId: string): Promise<Game> => {
  const gameUrl = `${backendUrl}${gamePath}/${encodeURIComponent(gameId)}`;

  const response = await fetch(gameUrl, {
    method: "GET",
  });

  if (!response.ok) {
    const errorText = await JSON.parse(await response.text());
    throw new Error(`Failed to fetch the game: ${errorText.error}`);
  }

  return await response.json();
};

export const getGameStateVersion = async (
  gameId: number,
): Promise<GameStateVersionResponse> => {
  const gameStateVersionUrl = `${backendUrl}${gamePath}/${encodeURIComponent(gameId)}${gameStateVersion}`;

  const response = await fetch(gameStateVersionUrl, {
    method: "GET",
  });

  if (!response.ok) {
    const errorText = await JSON.parse(await response.text());
    throw new Error(
      `Failed to fetch the game state version: ${errorText.error}`,
    );
  }

  return await response.json();
};

export const runPlayToken = async (
  gameId: number,
  column: number,
): Promise<Game> => {
  const gameUrl = `${backendUrl}${gamePath}/`;
  const response = await fetch(
    `${gameUrl}${gameId}${playtokenPath}?column=${column}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to play token.");
  }

  return await response.json();
};

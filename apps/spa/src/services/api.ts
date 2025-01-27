import {
  Game,
  GameStateVersionResponse,
} from "../../../../packages/shared/types/gameState";

const backendUrl =
  import.meta.env.VITE_REST_API_URL || "https://127.0.0.1:8443";
const gameUrl = `${backendUrl}/game`;
const playtokenPath = "/playtoken";
const gameStateVersionPath = "/stateVersion";

export const createGame = async (state: string | null): Promise<Game> => {
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
  const gameUrlWithId = `${gameUrl}/${encodeURIComponent(gameId)}`;

  const response = await fetch(gameUrlWithId, {
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
  const gameStateVersionUrl = `${gameUrl}/${encodeURIComponent(gameId)}${gameStateVersionPath}`;

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
  const response = await fetch(
    `${gameUrl}/${gameId}${playtokenPath}?column=${column}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to play token.");
  }

  return await response.json();
};

import { Game } from "../../../../packages/shared/types/gameState";

export type ApiResponse = {
  hello: string;
};

const backendUrl = import.meta.env.VITE_REST_API_URL || "http://localhost:3000";
const gamePath = "/game";

export const fetchHelloWorld = async (): Promise<ApiResponse> => {
  const response = await fetch(backendUrl);
  if (!response.ok) throw new Error("Failed to fetch hello world");
  return await response.json();
};

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

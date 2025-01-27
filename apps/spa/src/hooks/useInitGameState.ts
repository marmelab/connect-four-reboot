import type { Game } from "../../../../packages/shared/types/gameState";
import { useState, useEffect } from "react";
import { createGame } from "@services/api";

const useInitGameState = (content: string | null): Game | null => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const game: Game = await createGame(content);
        setGame(game);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [content]);
  return game;
};

export default useInitGameState;

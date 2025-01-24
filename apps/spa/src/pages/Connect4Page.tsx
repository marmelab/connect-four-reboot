import React, { useEffect, useState } from "react";
import GameGrid from "@components/GameGrid";
import { useSearchParams } from "react-router-dom";
import type { Game } from "../../../../packages/shared/types/gameState";

export const BOARD_STATE_QP = "state";
export const BOARD_STATE_QP_SEPARATOR_CHAR = ",";

const Connect4Page: React.FC = () => {
  const [searchParams] = useSearchParams();
  const gameParam = searchParams.get("game");
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (gameParam) {
      try {
        const decodedGame: Game = JSON.parse(decodeURIComponent(gameParam));
        setGame(decodedGame);
      } catch (error) {
        console.error("Failed to parse game data from URL:", error);
        alert("Invalid game data in URL.");
      }
    }
  }, [gameParam]);

  const handleUpdateGame = (updatedGame: Game) => {
    setGame(updatedGame);
  };

  if (!game) {
    return <p>Loading game ...</p>;
  }

  return (
    <div>
      <h1>Connect 4</h1>
      <GameGrid game={game} onUpdateGame={handleUpdateGame} />
    </div>
  );
};

export default Connect4Page;

import React from "react";
import Square from "@components/Square";
import { PlayerNum } from "../../../../packages/shared/types/gameState";
import { transpose } from "../../../../packages/shared/tools/tools";
import { isWinningToken } from "../../../../packages/shared/lib/connect4";
import { Game } from "../../../../packages/shared/types/gameState";
import { runPlayToken } from "@services/api";

interface ColumnProps {
  game: Game;
  index: number;
  onColumnClick: (updatedGame: Game) => void;
}

const Column = ({ game, index, onColumnClick }: ColumnProps) => {
  const handleClick = async () => {
    if (game.gameState.victoryState.player !== PlayerNum.empty) {
      alert("The game is over.");
      return;
    }
    try {
      const column = index + 1;
      const updatedGameState: Game = await runPlayToken(game.id, column);
      onColumnClick(updatedGameState);
    } catch (error) {
      console.error("Error while playing token:", error);
      alert("An error occurred while playing the token.");
    }
  };

  return (
    <div className="column" onClick={handleClick}>
      {transpose(game.gameState.boardState)[index].map((value, y) => (
        <Square
          value={value}
          x={index}
          y={y}
          isWinningToken={isWinningToken(game.gameState.victoryState, index, y)}
          key={`square${index}${y}`}
        />
      ))}
    </div>
  );
};

export default Column;

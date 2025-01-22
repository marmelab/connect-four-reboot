import React from "react";
import Square from "@components/Square";
import {
  PlayerNum,
  type GameState,
} from "../../../../packages/shared/types/gameState";
import { transpose } from "../../../../packages/shared/tools/tools";
import { isWinningToken } from "../../../../packages/shared/lib/connect4";

interface ColumnProps {
  gameState: GameState;
  index: number;
  onColumnClick: (column: number) => void;
}

const Column = ({ gameState, index, onColumnClick }: ColumnProps) => {
  const handleClick = () => {
    if (gameState.victoryState.player !== PlayerNum.empty) {
      alert("The game is over.");
      return;
    }
    onColumnClick(index + 1);
  };

  return (
    <div className="column" onClick={handleClick}>
      {transpose(gameState.boardState)[index].map((value, y) => (
        <Square
          value={value}
          x={index}
          y={y}
          isWinningToken={isWinningToken(gameState.victoryState, index, y)}
          key={`square${index}${y}`}
        />
      ))}
    </div>
  );
};

export default Column;

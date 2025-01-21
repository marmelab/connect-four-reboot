import React from "react";
import Square from "@components/Square";
import type { GameState } from "../../../../packages/shared/types/gameState";
import { transpose } from "../../../../packages/shared/tools/tools";

interface ColumnProps {
  gameState: GameState;
  index: number;
  onColumnClick: (gameState: GameState, column: number) => GameState;
  updateGameState: (newGameState: GameState) => void;
}

const Column = ({
  gameState,
  index,
  onColumnClick,
  updateGameState,
}: ColumnProps) => {
  const handleClick = () => {
    updateGameState(onColumnClick(gameState, index + 1));
  };

  return (
    <div className="column" onClick={handleClick}>
      {transpose(gameState.boardState)[index].map((value, y) => (
        <Square value={value} x={index} y={y} key={`square${index}${y}`} />
      ))}
    </div>
  );
};

export default Column;

import React from "react";
import Column from "@components/Column";
import { transpose } from "../../../../packages/shared/tools/tools";
import type { GameState } from "../../../../packages/shared/types/gameState";

interface GameGridProps {
  gameState: GameState;
  playToken: (gameState: GameState, column: number) => GameState;
  updateGameState: (newGameState: GameState) => void;
}

const GameGrid = ({ gameState, playToken, updateGameState }: GameGridProps) => {
  return (
    <div id="game-grid">
      <div id="grid-container">
        {transpose(gameState.boardState).map((column, index) => (
          <Column
            gameState={gameState}
            index={index}
            onColumnClick={playToken}
            updateGameState={updateGameState}
            key={`column${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;

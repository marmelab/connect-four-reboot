import React from "react";
import Column from "@components/Column";
import { transpose } from "../../../../packages/shared/tools/tools";
import type { GameState } from "../../../../packages/shared/types/gameState";
import GameInfos from "./GameInfos";

interface GameGridProps {
  gameState: GameState;
  playToken: (column: number) => void;
}

const GameGrid = ({ gameState, playToken }: GameGridProps) => {
  return (
    <div>
      <div id="game-grid">
        <div id="grid-container">
          {transpose(gameState.boardState).map((column, index) => (
            <Column
              gameState={gameState}
              index={index}
              onColumnClick={playToken}
              key={`column${index}`}
            />
          ))}
        </div>
      </div>
      <GameInfos gameState={gameState} />
    </div>
  );
};

export default GameGrid;

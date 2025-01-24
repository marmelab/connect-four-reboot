import React, { useState } from "react";
import Column from "@components/Column";
import { transpose } from "../../../../packages/shared/tools/tools";
import type { Game } from "../../../../packages/shared/types/gameState";
import GameInfos from "./GameInfos";

interface GameGridProps {
  game: Game;
  onUpdateGame: (updatedGame: Game) => void;
}

const GameGrid = ({ game, onUpdateGame }: GameGridProps) => {
  const [state, setState] = useState(game);
  const handleUpdateGameState = (updatedGame: Game) => {
    setState(updatedGame);
    onUpdateGame(updatedGame);
  };
  return (
    <div>
      <div id="game-grid">
        <div id="grid-container">
          {transpose(game.gameState.boardState).map((column, index) => (
            <Column
              game={state}
              index={index}
              onColumnClick={handleUpdateGameState}
              key={`column${index}`}
            />
          ))}
        </div>
      </div>
      <GameInfos gameState={game.gameState} />
    </div>
  );
};

export default GameGrid;

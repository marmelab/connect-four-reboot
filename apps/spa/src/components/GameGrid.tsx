import React from "react";
import Column from "@components/Column";
import { transpose } from "@utils/tools";

interface GameGridProps {
  boardState: Array<Array<number>>;
}

const GameGrid = ({ boardState }: GameGridProps) => {
  return (
    <div id="game-grid">
      <div id="grid-container">
        {transpose(boardState).map((column, index) => (
          <Column values={column} index={index} key={`column${index}`} />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;

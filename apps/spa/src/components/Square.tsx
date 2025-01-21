import React from "react";
import type { PlayerNum } from "../../../../packages/shared/types/gameState";

interface SquareProps {
  value: PlayerNum;
  x: number;
  y: number;
}

const Square = ({ value, x, y }: SquareProps) => {
  return (
    <div className="grid-item square" id={`${x}${y}`}>
      <div
        className={`circle ${value === 2 ? "red" : value === 1 ? "yellow" : "empty"}`}
      ></div>
    </div>
  );
};

export default Square;

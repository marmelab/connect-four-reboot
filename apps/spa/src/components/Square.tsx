import React from "react";
import type { PlayerNum } from "../../../../packages/shared/types/gameState";
import { tokenColors } from "../consts";

interface SquareProps {
  value: PlayerNum;
  x: number;
  y: number;
  isWinningToken: boolean;
}

const Square = ({ value, x, y, isWinningToken }: SquareProps) => {
  return (
    <div className="grid-item square" id={`${x}${y}`}>
      <div
        className={`circle ${tokenColors[value]} ${isWinningToken ? "highlight" : ""}`}
      ></div>
    </div>
  );
};

export default Square;

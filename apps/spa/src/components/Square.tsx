import React from "react";

interface SquareProps {
  value: number;
  x: number;
  y: number;
}

const Square: React.FC<SquareProps> = ({ value, x, y }) => {
  return (
    <div className="grid-item square" id={`${x}${y}`}>
      <div
        className={`circle ${value === 2 ? "red" : value === 1 ? "yellow" : "empty"}`}
      ></div>
    </div>
  );
};

export default Square;

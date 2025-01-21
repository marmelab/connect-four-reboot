import React from "react";
import Square from "@components/Square";

interface ColumnProps {
  values: Array<number>;
  index: number;
}

const Column = ({ values, index }: ColumnProps) => {
  return (
    <div className="column">
      {values.map((value, y) => (
        <Square value={value} x={index} y={y} key={`square${index}${y}`} />
      ))}
    </div>
  );
};

export default Column;

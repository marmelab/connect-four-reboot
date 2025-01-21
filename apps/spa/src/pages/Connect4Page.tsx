import React from "react";
import GameGrid from "@components/GameGrid";
import { useLocation } from "react-router-dom";
import { BOARD_STATE_QP } from "@utils/config";
import useParseBoardStateString from "@hooks/useParsedBoardState";

const Connect4Page: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const boardStateQP = queryParams.get(BOARD_STATE_QP);
  const boardState: Array<Array<number>> =
    useParseBoardStateString(boardStateQP);

  return (
    <div>
      {/* Connect4 : {boardStateQP} */}
      <GameGrid boardState={boardState} />
    </div>
  );
};

export default Connect4Page;

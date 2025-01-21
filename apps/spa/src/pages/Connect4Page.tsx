import React, { useEffect, useState } from "react";
import GameGrid from "@components/GameGrid";
import { useSearchParams } from "react-router-dom";
import { playToken } from "../../../../packages/shared/lib/connect4";
import useInitGameState from "@hooks/useInitGameState";
import type { GameState } from "../../../../packages/shared/types/gameState";

export const BOARD_STATE_QP = "state";
export const BOARD_STATE_QP_SEPARATOR_CHAR = ",";

const Connect4Page: React.FC = () => {
  const [searchParams] = useSearchParams();
  const boardStateQP = searchParams.get(BOARD_STATE_QP);
  const gameState = useInitGameState(boardStateQP);

  const [state, setState] = useState<GameState | null>(gameState);

  // useEffect(() => {
  //   if (boardStateQP) {
  //     const initialState = useInitGameState(boardStateQP);
  //     setState(initialState);
  //   }
  // }, [boardStateQP]);

  const updateGameState = (newGameState: GameState) => {
    // Mettre à jour le gameState en mémoire
    setState(newGameState);
  };

  return (
    <div>
      {state === null ? (
        <p>Game state is not available. Please try again later.</p>
      ) : (
        <GameGrid
          gameState={state}
          playToken={playToken}
          updateGameState={updateGameState}
        />
      )}
    </div>
  );
};

export default Connect4Page;

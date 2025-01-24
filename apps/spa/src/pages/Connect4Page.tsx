import React, { useEffect, useReducer } from "react";
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
  const game = useInitGameState(boardStateQP);

  useEffect(() => {
    if (game?.gameState) {
      dispatch({ type: "SET_GAME_STATE", payload: game.gameState });
    }
  }, [game]);

  type Action =
    | { type: "SET_GAME_STATE"; payload: GameState }
    | { type: "PLAY_TOKEN"; payload: { column: number } };

  const gameReducer = (
    state: GameState | null,
    action: Action,
  ): GameState | null => {
    switch (action.type) {
      case "SET_GAME_STATE":
        return action.payload;
      case "PLAY_TOKEN":
        if (state === null) return state;
        return playToken(state, action.payload.column);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(gameReducer, game?.gameState || null);

  const handlePlayToken = (column: number) => {
    dispatch({ type: "PLAY_TOKEN", payload: { column } });
  };

  return (
    <div>
      {state === null ? (
        <p>Game state is not available.</p>
      ) : (
        <GameGrid gameState={state} playToken={handlePlayToken} />
      )}
    </div>
  );
};

export default Connect4Page;

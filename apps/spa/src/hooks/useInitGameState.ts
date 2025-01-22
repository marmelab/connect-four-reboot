import type { GameState } from "../../../../packages/shared/types/gameState";
import { CONNECT_FOUR } from "../../../../packages/shared/connect4.config";
import { initGameState } from "../../../../packages/shared/lib/connect4";

const useInitGameState = (content: string | null): GameState | null => {
  const boardState: Array<Array<number>> = [];
  if (!content) {
    return initGameState();
  }

  const valArray: Array<number> = content.split(",").map((e) => Number(e));

  Array.from({ length: CONNECT_FOUR.NB_ROWS }, (_, i) => {
    boardState.push(
      valArray.slice(
        i * CONNECT_FOUR.NB_COLUMNS,
        (i + 1) * CONNECT_FOUR.NB_COLUMNS,
      ),
    );
  });
  return initGameState(boardState);
};

export default useInitGameState;

import {
  initGameState,
  playToken,
} from "../../../packages/shared/lib/connect4.ts";
import {
  BoardState,
  PlayerNum,
} from "../../../packages/shared/types/gameState.ts";
import { messages, PLACEHOLDER } from "./config/messages.ts";
import {
  printBoardGameToConsole,
  boardGameToString,
} from "./layout/cliLayout.ts";
import { readNextPlay, readForNextRound, closePrompt } from "./prompt.ts";

export async function runConnect4(stateConfigFile?: BoardState) {
  let gameState = initGameState(stateConfigFile);

  printBoardGameToConsole(boardGameToString(gameState));

  let validMove = false;

  // Game loop
  while (
    gameState.victoryState.player === PlayerNum.empty &&
    !gameState.victoryState.isDraw
  ) {
    const columnToPlay = await readNextPlay();
    try {
      gameState = playToken(gameState, columnToPlay);
      validMove = true;
      printBoardGameToConsole(boardGameToString(gameState));
    } catch (e) {
      console.log(
        messages.ERROR_COLUMN_FULL.replace(PLACEHOLDER, `${columnToPlay}`),
      );
    }
  }

  // Retry question
  const answer = await readForNextRound();
  if (answer) {
    runConnect4(stateConfigFile);
  } else {
    closePrompt();
  }
}

import { messages, PLACEHOLDER } from "./config/messages.js";
import { BoardState, GameState, PlayerNum } from "./types/gameState.js";
import {
  boardLayout,
  boardStateToString,
  printBoardStateToConsole,
} from "./layout/cliLayout.js";
import { readNextPlay } from "./prompt.js";
import { transpose } from "./tools.js";

/**
 * @throws Error if the played column is already full
 */
export function playToken(gameState: GameState, column: number): GameState {
  if (column < 0 || column > boardLayout.NB_COLUMN) {
    throw new Error(messages.ERROR_INVALID_COLUMN_NUMBER);
  }
  const result = structuredClone(gameState);

  // Transpose the game board, allowing computing using colums instead lines
  const transposedBoardState = transpose(result.boardState);

  // highest token's index=0 ; lowest token's index = boardLayout.NB_ROWS - 1
  // Got the highest token's index
  const highestTokenIndex: number = transposedBoardState[column - 1].findIndex(
    (elem) => elem > 0,
  );

  // highestTokenIndex = 0 => the column is full
  if (highestTokenIndex === 0) {
    throw new Error(
      messages.ERROR_COLUMN_FULL.replace(PLACEHOLDER, "" + column),
    );
  }
  // highestTokenIndex = -1 => the column is empty
  const newTokenIndex =
    (highestTokenIndex > -1 ? highestTokenIndex : boardLayout.NB_ROWS) - 1;

  result.boardState[newTokenIndex][column - 1] = result.currentPlayer;
  result.currentPlayer =
    result.currentPlayer === PlayerNum.p1 ? PlayerNum.p2 : PlayerNum.p1;

  return result;
}

/**
 * @throws SyntaxError if the board contains flying tokens
 */
function checkForProhibitedFlyingTokens(boardState: BoardState) {
  // Transpose the game board, allowing computing using colums instead lines
  const transposedState = transpose(boardState);

  // check for no flying token
  const hasFlyingTokenError = transposedState.reduce(
    (hasColumnError, column) => {
      return (
        hasColumnError ||
        column.reduce((hasTokenError, token, index, column) => {
          return (
            hasTokenError || (index > 0 && token === 0 && column[index - 1] > 0)
          );
        }, false)
      );
    },
    false,
  );
  if (hasFlyingTokenError) {
    throw new SyntaxError("Given game state text contains missplaced token(s)");
  }
}

export function countNbTokens(
  boardState: BoardState,
): [number, number, number] {
  const flatSortedBoardState: Array<PlayerNum> = boardState.flat(2).sort();

  const emptyCount = flatSortedBoardState.findIndex(
    (elem) => elem === PlayerNum.p1,
  );
  const p1Count =
    flatSortedBoardState.findIndex((elem) => elem === PlayerNum.p2) -
    emptyCount;

  return [
    emptyCount,
    p1Count,
    flatSortedBoardState.length - (emptyCount + p1Count),
  ];
}

/**
 * @throws SyntaxError if the board contains bad number of tokens by player
 *
 *  Each player has the same number +-1.
 */
function checkForWrongNumberOfTokens(boardState: BoardState) {
  const nbTokens: [number, number, number] = countNbTokens(boardState);
  const hasNbTokensError = Math.abs(nbTokens[1] - nbTokens[2]) > 1;
  if (hasNbTokensError) {
    throw new SyntaxError(
      "Given game state text contains wrong number of token(s)",
    );
  }
}

/**
 * @throws SyntaxError if the board is invalid
 */
export function checkBoardStateConsistency(boardState: BoardState): void {
  checkForProhibitedFlyingTokens(boardState);
  checkForWrongNumberOfTokens(boardState);
}

/**
 * @throws SyntaxError if the board is invalid (checkBoardStateConsistency)
 */
export function initGameState(stateConfigFile: BoardState): GameState {
  const gameState: GameState = {
    boardState: stateConfigFile,
    currentPlayer: PlayerNum.empty,
  };
  const count: [number, number, number] = countNbTokens(gameState.boardState);
  gameState.currentPlayer = count[1] > count[2] ? PlayerNum.p1 : PlayerNum.p2;
  checkBoardStateConsistency(gameState.boardState);
  return gameState;
}

export async function runConnect4(stateConfigFile: BoardState) {
  let gameState = initGameState(stateConfigFile);

  printBoardStateToConsole(boardStateToString(gameState));
  let validMove = false;
  while (true) {
    const columnToPlay = await readNextPlay(gameState);
    try {
      gameState = playToken(gameState, columnToPlay);
      validMove = true;
      printBoardStateToConsole(boardStateToString(gameState));
    } catch (e) {
      console.log(
        messages.ERROR_COLUMN_FULL.replace(PLACEHOLDER, `${columnToPlay}`),
      );
    }
  }
}

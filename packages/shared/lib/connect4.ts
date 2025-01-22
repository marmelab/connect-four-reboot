import { transpose } from "../tools/tools.js";
import {
  BoardState,
  CountNbTokens,
  GameState,
  PlayerNum,
  VictoryState,
} from "../types/gameState.js";
import {
  CONNECT_FOUR,
  PLACEHOLDER,
  ERROR_MESSAGES,
} from "../connect4.config.js";

/**
 * @throws Error if the played column is already full
 */
export function playToken(gameState: GameState, column: number): GameState {
  if (column <= 0 || column > CONNECT_FOUR.NB_COLUMNS) {
    throw new Error(ERROR_MESSAGES.ERROR_INVALID_COLUMN_NUMBER);
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
      ERROR_MESSAGES.ERROR_COLUMN_FULL.replace(PLACEHOLDER, "" + column),
    );
  }
  // highestTokenIndex = -1 => the column is empty
  const newTokenIndex =
    (highestTokenIndex > -1 ? highestTokenIndex : CONNECT_FOUR.NB_ROWS) - 1;

  result.boardState[newTokenIndex][column - 1] = result.currentPlayer;
  result.currentPlayer =
    result.currentPlayer === PlayerNum.p1 ? PlayerNum.p2 : PlayerNum.p1;

  result.victoryState = getWinner(result.boardState);

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

export function countNbTokens(boardState: BoardState): CountNbTokens {
  const flatSortedBoardState: Array<PlayerNum> = boardState.flat(2).sort();

  const emptyCount = flatSortedBoardState.filter(
    (elem) => elem === PlayerNum.empty,
  ).length;

  const p1Count = flatSortedBoardState.filter(
    (elem) => elem === PlayerNum.p1,
  ).length;

  return {
    emptyCount: emptyCount,
    p1Count: p1Count,
    p2Count: flatSortedBoardState.length - (emptyCount + p1Count),
  };
}

/**
 * @throws SyntaxError if the board contains bad number of tokens by player
 *
 *  Each player has the same number +-1.
 */
function checkForWrongNumberOfTokens(boardState: BoardState) {
  const nbTokens: CountNbTokens = countNbTokens(boardState);
  const hasNbTokensError = Math.abs(nbTokens.p1Count - nbTokens.p2Count) > 1;
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

export function createEmptyBoardState() {
  return Array.from({ length: Number(CONNECT_FOUR.NB_ROWS) }, () =>
    Array(CONNECT_FOUR.NB_COLUMNS).fill(0),
  );
}
/**
 * @throws SyntaxError if the board is invalid (checkBoardStateConsistency)
 */
export function initGameState(stateConfigFile?: BoardState): GameState {
  const boardState: BoardState = stateConfigFile
    ? stateConfigFile
    : createEmptyBoardState();

  const gameState: GameState = {
    boardState: boardState,
    currentPlayer: PlayerNum.empty,
    victoryState: getWinner(boardState),
  };
  const count: CountNbTokens = countNbTokens(gameState.boardState);

  gameState.currentPlayer = stateConfigFile
    ? count.p1Count > count.p2Count
      ? PlayerNum.p1
      : PlayerNum.p2
    : Math.floor(Math.random() * 2) + 1;

  checkBoardStateConsistency(gameState.boardState);
  return gameState;
}

export function getWinner(board: BoardState): VictoryState {
  const directions = [
    { x: 1, y: 0 }, // horizontal
    { x: 0, y: 1 }, // vertical
    { x: 1, y: 1 }, // diagonal down-right
    { x: 1, y: -1 }, // diagonal up-right
  ];

  let buffer: Array<[Number, number]> = [];
  for (let row = 0; row < CONNECT_FOUR.NB_ROWS; row++) {
    for (let col = 0; col < CONNECT_FOUR.NB_COLUMNS; col++) {
      const token = board[row][col];
      if (token === PlayerNum.empty) continue;

      for (const { x, y } of directions) {
        buffer = [[col, row]];
        for (
          let step = 1;
          step < CONNECT_FOUR.NB_TOKEN_IN_A_FOUR_LINE;
          step++
        ) {
          const newRow = row + step * y;
          const newCol = col + step * x;
          if (
            newRow < 0 ||
            newRow >= CONNECT_FOUR.NB_ROWS ||
            newCol < 0 ||
            newCol >= CONNECT_FOUR.NB_COLUMNS ||
            board[newRow][newCol] !== token
          ) {
            break;
          }

          buffer.push([newCol, newRow]);
        }
        if (buffer.length === CONNECT_FOUR.NB_TOKEN_IN_A_FOUR_LINE) {
          return {
            player: token,
            fourLineCoordinates: buffer,
            isDraw: false,
          };
        }
      }
    }
  }

  return {
    player: PlayerNum.empty,
    fourLineCoordinates: [],
    isDraw: isFull(board),
  };
}

export function isWinningToken(
  victoryState: VictoryState,
  columnIndex: number,
  rowIndex: number,
): boolean {
  return victoryState.fourLineCoordinates.some(
    ([x, y]) => x === columnIndex && y === rowIndex,
  );
}

export function isFull(board: BoardState): boolean {
  return board.flat().every((cell) => cell !== PlayerNum.empty);
}

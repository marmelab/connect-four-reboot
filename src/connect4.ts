import * as readline from "readline";

export enum boardLayout {
  PLACEHOLDER = "$",
  TOP = "+---+---+---+---+---+---+---+",
  BOTTOM = "+---+---+---+---+---+---+---+\n  1   2   3   4   5   6   7  ",
  INFORMATIONS = "\n-- You are player: " + PLACEHOLDER + " --",
  PROMPT = "Please enter the column number you want to play your token $ [1-7]: ",
  ERROR_INVALID_COLUMN_NUMBER = "Invalid column number.\n",
  ERROR_COLUMN_FULL = "Cannot add token into column $ which is full.\n",
  SEPARATOR = "|",
  PLAYER_ONE_TOKEN = "o",
  PLAYER_TWO_TOKEN = "x",
  EMPTY_TOKEN = " ",
  NB_ROWS = 6,
  NB_COLUMN = 7,
}

export enum PlayerNum {
  p1 = 1,
  p2 = 2,
  empty = 0,
}
export type BoardState = Array<Array<PlayerNum>>;

export interface GameState {
  boardState: BoardState;
  currentPlayer: PlayerNum;
}

export function getPlayerTokenChar(playerNum: PlayerNum) {
  switch (playerNum) {
    case PlayerNum.p1:
      return boardLayout.PLAYER_ONE_TOKEN;
    case PlayerNum.p2:
      return boardLayout.PLAYER_TWO_TOKEN;
    case PlayerNum.empty:
      return boardLayout.EMPTY_TOKEN;
  }
}

export function printBoardStateToConsole(boardState: String): void {
  console.clear();
  console.log(boardState);
}

export function boardStateToString(gameState: GameState): String {
  const resultDisplay: Array<String> = [];

  resultDisplay.push(`\n${boardLayout.TOP}\n`);

  gameState.boardState.forEach((line: Array<number>) => {
    line.forEach((token: number) => {
      resultDisplay.push(
        `${boardLayout.SEPARATOR} ${
          token === 1
            ? boardLayout.PLAYER_ONE_TOKEN
            : token === 2
              ? boardLayout.PLAYER_TWO_TOKEN
              : boardLayout.EMPTY_TOKEN
        } `,
      );
    });
    resultDisplay.push(`${boardLayout.SEPARATOR}\n`);
  });

  resultDisplay.push(`${boardLayout.BOTTOM}\n`);

  // Player information
  const p1Token = getPlayerTokenChar(PlayerNum.p1);
  resultDisplay.push(
    `${boardLayout.INFORMATIONS.replace(boardLayout.PLACEHOLDER, p1Token)}\n`,
  );

  return resultDisplay.join("");
}

/**
 * @throws Error if the played column is already full
 */
export function playToken(
  boardState: BoardState,
  column: number,
  pNum: number,
): BoardState {
  const result = structuredClone(boardState);

  // Transpose the game board, allowing computing using colums instead lines
  const transposedBoardState = transpose(result);

  // highest token's index=0 ; lowest token's index = boardLayout.NB_ROWS - 1
  // Got the highest token's index
  const highestTokenIndex: number = transposedBoardState[column - 1].findIndex(
    (elem) => elem > 0,
  );

  // highestTokenIndex = 0 => the column is full
  if (highestTokenIndex === 0) {
    throw new Error(
      boardLayout.ERROR_COLUMN_FULL.replace(
        boardLayout.PLACEHOLDER,
        "" + column,
      ),
    );
  }
  // highestTokenIndex = -1 => the column is empty
  const newTokenIndex =
    (highestTokenIndex > -1 ? highestTokenIndex : boardLayout.NB_ROWS) - 1;

  result[newTokenIndex][column - 1] = pNum;

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

function transpose(matrix: Array<Array<number>>) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function readNextPlay(rl: readline.Interface, gameState: GameState) {
  rl.question(
    boardLayout.PROMPT.replace(
      boardLayout.PLACEHOLDER,
      getPlayerTokenChar(PlayerNum.p1),
    ),
    (answer) => {
      const numAnswer = Number(answer);

      switch (true) {
        case isNaN(numAnswer) ||
          numAnswer <= 0 ||
          numAnswer > boardLayout.NB_COLUMN:
          console.error(boardLayout.ERROR_INVALID_COLUMN_NUMBER);
          readNextPlay(rl, gameState);
          break;

        case numAnswer > 0 && numAnswer < boardLayout.NB_COLUMN:
          try {
            gameState.boardState = playToken(
              gameState.boardState,
              numAnswer,
              PlayerNum.p1,
            );
          } catch (e) {
            console.log(
              boardLayout.ERROR_COLUMN_FULL.replace(
                boardLayout.PLACEHOLDER,
                `${numAnswer}`,
              ),
            );
            readNextPlay(rl, gameState);
            break;
          }

          rl.close();
          printBoardStateToConsole(boardStateToString(gameState));
      }
    },
  );
}

export function initPrompt(gameState: GameState) {
  const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readNextPlay(rl, gameState);
}

export function runConnect4(stateConfigFile: BoardState) {
  const gameState: GameState = {
    boardState: stateConfigFile,
    currentPlayer: PlayerNum.empty,
  };
  const count: [number, number, number] = countNbTokens(gameState.boardState);
  gameState.currentPlayer = count[1] > count[2] ? PlayerNum.p1 : PlayerNum.p2;

  checkBoardStateConsistency(gameState.boardState);
  printBoardStateToConsole(boardStateToString(gameState));
  initPrompt(gameState);
}

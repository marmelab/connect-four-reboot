import * as readline from "readline";

enum boardLayout {
  PLACEHOLDER = "$",
  TOP = "+---+---+---+---+---+---+---+",
  BOTTOM = "+---+---+---+---+---+---+---+\n  1   2   3   4   5   6   7  ",
  INFORMATIONS = "\n-- You are first player: " + PLACEHOLDER + " --",
  PROMPT = "Please enter the column number you want to play your token $ [1-7]: ",
  ERROR_INVALID_ANSWER = "Invalid column number.\n",
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
  p1Num: PlayerNum;
  p2Num: PlayerNum;
}

export function getPlayerToken(playerNum: PlayerNum) {
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
        `${boardLayout.SEPARATOR} ${token === 1 ? boardLayout.PLAYER_ONE_TOKEN : token === 2 ? boardLayout.PLAYER_TWO_TOKEN : boardLayout.EMPTY_TOKEN} `,
      );
    });
    resultDisplay.push(`${boardLayout.SEPARATOR}\n`);
  });

  resultDisplay.push(`${boardLayout.BOTTOM}\n`);

  const p1Token = getPlayerToken(PlayerNum.p1);

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
  const res = structuredClone(boardState);

  const transposedRes = transpose(res);
  const index: number = transposedRes[column - 1].findIndex((elem) => elem > 0);
  if (index === 0) {
    throw new Error(
      boardLayout.ERROR_COLUMN_FULL.replace(
        boardLayout.PLACEHOLDER,
        "" + column,
      ),
    );
  }
  res[(index > -1 ? index : boardLayout.NB_ROWS) - 1][column - 1] = pNum;

  return res;
}

export function countNbTokens(boardState: BoardState): [number, number] {
  return boardState
    .flat(2)
    .reduce(
      ([nbP1Token, nbP2Token], column) =>
        column === 1
          ? [nbP1Token + 1, nbP2Token]
          : column === 2
            ? [nbP1Token, nbP2Token + 1]
            : [nbP1Token, nbP2Token],
      [0, 0],
    );
}

/**
 * @throws SyntaxError if the board contains flying tokens
 */
function checkForProhibitedFlyingTokens(boardState: BoardState) {
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

/**
 * @throws SyntaxError if the board contains bad number of tokens by player
 *
 *  Each player has the same number +-1.
 */
function checkForWrongNumberOfTokens(boardState: BoardState) {
  const nbTokens: [number, number] = countNbTokens(boardState);
  const hasNbTokensError = Math.abs(nbTokens[0] - nbTokens[1]) > 1;
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

// Used to transpose the game board, allowing computing using colums instead lines
function transpose(matrix: Array<Array<number>>) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function initBoardState(stateConfigFile: BoardState): GameState {
  const result = {
    boardState: stateConfigFile,
    playedMoves: [],
    currentBoardState: stateConfigFile,
    p1Num: 1,
    p2Num: 2,
  };
  const nbTokens: [number, number] = countNbTokens(result.boardState);
  result.p1Num = nbTokens[0] > nbTokens[1] ? PlayerNum.p2 : PlayerNum.p1;
  result.p2Num = result.p1Num === PlayerNum.p1 ? PlayerNum.p2 : PlayerNum.p1;
  checkBoardStateConsistency(result.boardState);
  return result;
}

export function promptRead(rl: readline.Interface, gameState: GameState) {
  rl.question(
    boardLayout.PROMPT.replace(
      boardLayout.PLACEHOLDER,
      getPlayerToken(PlayerNum.p1),
    ),
    (answer) => {
      const numAnswer = Number(answer);
      switch (true) {
        case isNaN(numAnswer) ||
          numAnswer <= 0 ||
          numAnswer > boardLayout.NB_COLUMN:
          console.log(boardLayout.ERROR_INVALID_ANSWER);
          promptRead(rl, gameState);
          break;
        case numAnswer > 0 && numAnswer < 8:
          try {
            playToken(gameState.boardState, numAnswer, PlayerNum.p1);
          } catch (e) {
            console.log(
              boardLayout.ERROR_COLUMN_FULL.replace(
                boardLayout.PLACEHOLDER,
                `${numAnswer}`,
              ),
            );
            promptRead(rl, gameState);
            break;
          }
          printBoardStateToConsole(boardStateToString(gameState));
          rl.close();
      }
    },
  );
}

export function prompt(gameState: GameState) {
  const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  promptRead(rl, gameState);
}

export function runConnect4(stateConfigFile: BoardState) {
  const gameState = initBoardState(stateConfigFile);
  printBoardStateToConsole(boardStateToString(gameState));
  prompt(gameState);
}

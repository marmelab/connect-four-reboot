enum boardLayout {
  TOP = "+---+---+---+---+---+---+---+",
  BOTTOM = "+---+---+---+---+---+---+---+\n  1   2   3   4   5   6   7  ",
  SEPARATOR = "|",
  PLAYER_ONE_TOKEN = "o",
  PLAYER_TWO_TOKEN = "x",
  EMPTY_TOKEN = " ",
}
export interface GameState {
  boardState: Array<Array<number>>;
}

function printBoardStateToConsole(boardState: String): void {
  console.log(boardState);
}

function boardStateToString(boardState: GameState["boardState"]): String {
  const resultDisplay: Array<String> = [];
  resultDisplay.push(`${boardLayout.TOP}\n`);

  boardState.forEach((line: Array<number>) => {
    line.forEach((token: number) => {
      resultDisplay.push(
        `${boardLayout.SEPARATOR} ${token === 1 ? boardLayout.PLAYER_ONE_TOKEN : token === 2 ? boardLayout.PLAYER_TWO_TOKEN : boardLayout.EMPTY_TOKEN} `,
      );
    });
    resultDisplay.push(`${boardLayout.SEPARATOR}\n`);
  });

  resultDisplay.push(`${boardLayout.BOTTOM}\n`);

  return resultDisplay.join("");
}

/**
 * @throws SyntaxError if the board is invalid
 */
function checkBoardStateConsistency(boardState: GameState["boardState"]): void {
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

  // Check for nb tokens. Each player has the same number +-1.
  const nbTokens = transposedState
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
  const hasNbTokensError = Math.abs(nbTokens[0] - nbTokens[1]) > 1;
  if (hasNbTokensError) {
    throw new SyntaxError(
      "Given game state text contains wrong number of token(s)",
    );
  }
}

// Used to transpose the game board, allowing computing using colums instead lines
function transpose(matrix: Array<Array<number>>) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function runConnect4(gameState: GameState) {
  checkBoardStateConsistency(gameState.boardState);
  printBoardStateToConsole(boardStateToString(gameState.boardState));
}

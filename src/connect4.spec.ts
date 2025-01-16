import { describe, expect, test, vi } from "vitest";
import {
  checkBoardStateConsistency,
  countNbTokens,
  initGameState,
  playToken,
} from "./connect4";
import { GameState, PlayerNum } from "./types/gameState";
import {
  printBoardStateToConsole,
  boardStateToString,
} from "./layout/cliLayout";

interface TestingGameState extends GameState {
  boardDisplay?: string;
  boardDisplayAfterFirstMove?: string;
}

test("countNbToken", () => {
  const boardState = [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 0, 0],
    [0, 2, 1, 1, 2, 0, 2],
    [0, 1, 1, 2, 1, 1, 1],
    [0, 2, 2, 1, 1, 2, 2],
  ];

  expect(countNbTokens(boardState)).toEqual([20, 11, 11]);
});

describe("When a board state contains 'flying tokens', it", () => {
  test("throws an error (at position [0,0])", () => {
    const flyingTokenIncorrectGameState1: TestingGameState = {
      boardState: [
        [1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 0, 0],
        [0, 2, 1, 1, 2, 0, 2],
        [0, 1, 1, 2, 1, 1, 1],
        [0, 2, 2, 1, 1, 2, 2],
      ],
      currentPlayer: PlayerNum.p1,
    };
    expect(() =>
      checkBoardStateConsistency(flyingTokenIncorrectGameState1.boardState),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });

  test("throws an error (in the middle of the board game)", () => {
    const flyingTokenIncorrectGameState2: TestingGameState = {
      boardState: [
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 1, 0],
        [0, 2, 1, 1, 2, 0, 2],
        [0, 1, 1, 2, 1, 1, 1],
        [0, 2, 2, 1, 1, 2, 2],
      ],
      currentPlayer: PlayerNum.p1,
    };
    expect(() =>
      checkBoardStateConsistency(flyingTokenIncorrectGameState2.boardState),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });
});

describe("When a board state contains a wrong number of token, it", () => {
  test("throws an error for p1", () => {
    const nbTokenIncorrectGameState1: TestingGameState = {
      boardState: [
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 0, 0],
        [0, 2, 1, 1, 2, 0, 2],
        [1, 1, 1, 2, 1, 1, 1],
        [1, 2, 2, 1, 1, 2, 2],
      ],
      currentPlayer: PlayerNum.p1,
    };
    expect(() =>
      checkBoardStateConsistency(nbTokenIncorrectGameState1.boardState),
    ).toThrowError("Given game state text contains wrong number of token(s)");
  });

  test("throws an error for p2", () => {
    const nbTokenIncorrectGameState2: TestingGameState = {
      boardState: [
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 2, 0],
        [0, 2, 1, 1, 2, 2, 2],
        [0, 1, 1, 2, 1, 1, 1],
        [0, 2, 2, 1, 1, 2, 2],
      ],
      currentPlayer: PlayerNum.p1,
    };
    expect(() =>
      checkBoardStateConsistency(nbTokenIncorrectGameState2.boardState),
    ).toThrowError("Given game state text contains wrong number of token(s)");
  });
});

describe("Entry point 'initGameState'", () => {
  test("displays a game board with correct game state", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const correctGameState: TestingGameState = {
      boardState: [
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 0, 0],
        [0, 2, 1, 1, 2, 0, 2],
        [0, 1, 1, 2, 1, 1, 1],
        [0, 2, 2, 1, 1, 2, 2],
      ],
      boardDisplay: `
+---+---+---+---+---+---+---+
|   |   |   |   | o |   |   |
|   |   |   |   | x |   |   |
|   | x | o |   | x |   |   |
|   | x | o | o | x |   | x |
|   | o | o | x | o | o | o |
|   | x | x | o | o | x | x |
+---+---+---+---+---+---+---+
  1   2   3   4   5   6   7  

-- You are player 2: x --
`,
      currentPlayer: PlayerNum.p1,
    };

    printBoardStateToConsole(
      boardStateToString(initGameState(correctGameState.boardState)),
    );

    expect(consoleSpy).toHaveBeenCalledWith(correctGameState.boardDisplay);
  });

  test("throws an error with incorrect game state", () => {
    const flyingTokenIncorrectGameState1: TestingGameState = {
      boardState: [
        [1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 0, 0],
        [0, 2, 1, 1, 2, 0, 2],
        [0, 1, 1, 2, 1, 1, 1],
        [0, 2, 2, 1, 1, 2, 2],
      ],
      currentPlayer: PlayerNum.p1,
    };
    expect(() =>
      initGameState(flyingTokenIncorrectGameState1.boardState),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });

  describe("'playtoken' - When the player place a token ", () => {
    const correctGameState: TestingGameState = {
      boardState: [
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 0, 0],
        [0, 2, 1, 1, 2, 0, 2],
        [0, 1, 1, 2, 1, 1, 1],
        [0, 2, 2, 1, 1, 2, 2],
      ],
      boardDisplayAfterFirstMove: `
+---+---+---+---+---+---+---+
|   |   |   |   | o |   |   |
|   |   |   |   | x |   |   |
|   | x | o |   | x |   |   |
|   | x | o | o | x |   | x |
|   | o | o | x | o | o | o |
| o | x | x | o | o | x | x |
+---+---+---+---+---+---+---+
  1   2   3   4   5   6   7  

-- You are player 2: x --
`,
      currentPlayer: PlayerNum.p1,
    };
    test("in a correct column, the game board's display refreshes with the new token", () => {
      const gameState = playToken(correctGameState, 1);
      expect(boardStateToString(gameState)).toBe(
        correctGameState.boardDisplayAfterFirstMove,
      );
    });

    test("in a full column, an error throws to indicate the problem to the user", () => {
      const colNum: number = 5;
      expect(() => playToken(correctGameState, colNum)).toThrowError(
        `Cannot add token into column ${colNum} which is full.`,
      );
    });
  });
});
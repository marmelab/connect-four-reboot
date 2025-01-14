import { describe, expect, test, vi } from "vitest";
import { main } from "./index";
import {
  boardStateToString,
  checkBoardStateConsistency,
  GameState,
  PlayerNum,
  printBoardStateToConsole,
  runConnect4,
} from "./connect4";

interface TestingGameState extends GameState {
  boardDisplay?: String;
}

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

-- You are first player: o --

`,
  p1Num: PlayerNum.p1,
  p2Num: PlayerNum.p2,
};

const flyingTokenIncorrectGameState1: TestingGameState = {
  boardState: [
    [1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 0, 0],
    [0, 2, 1, 1, 2, 0, 2],
    [0, 1, 1, 2, 1, 1, 1],
    [0, 2, 2, 1, 1, 2, 2],
  ],
  p1Num: PlayerNum.p1,
  p2Num: PlayerNum.p2,
};

const flyingTokenIncorrectGameState2: TestingGameState = {
  boardState: [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 1, 0],
    [0, 2, 1, 1, 2, 0, 2],
    [0, 1, 1, 2, 1, 1, 1],
    [0, 2, 2, 1, 1, 2, 2],
  ],
  p1Num: PlayerNum.p1,
  p2Num: PlayerNum.p2,
};

const nbTokenIncorrectGameState1: TestingGameState = {
  boardState: [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 0, 0],
    [0, 2, 1, 1, 2, 0, 2],
    [1, 1, 1, 2, 1, 1, 1],
    [1, 2, 2, 1, 1, 2, 2],
  ],
  p1Num: PlayerNum.p1,
  p2Num: PlayerNum.p2,
};

const nbTokenIncorrectGameState2: TestingGameState = {
  boardState: [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 2, 0],
    [0, 2, 1, 1, 2, 2, 2],
    [0, 1, 1, 2, 1, 1, 1],
    [0, 2, 2, 1, 1, 2, 2],
  ],
  p1Num: PlayerNum.p1,
  p2Num: PlayerNum.p2,
};

test("Got a layouted board using 'boardStateToString'", () => {
  expect(boardStateToString(correctGameState)).toBe(
    correctGameState.boardDisplay,
  );
});

test("Displaying the board using 'printBoardStateToConsole'", () => {
  const consoleSpy = vi.spyOn(console, "log");
  const testingString: string = "Test console display";

  printBoardStateToConsole(testingString);

  expect(consoleSpy).toHaveBeenCalledWith(testingString);
});

describe("When a board state contains 'flying tokens', it", () => {
  test("throws an error (at position [0,0])", () => {
    expect(() =>
      checkBoardStateConsistency(flyingTokenIncorrectGameState1.boardState),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });

  test("throws an error (in the middle of the board game)", () => {
    expect(() =>
      checkBoardStateConsistency(flyingTokenIncorrectGameState2.boardState),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });
});

describe("When a board state contains a wrong number of token, it", () => {
  test("throws an error for p1", () => {
    expect(() =>
      checkBoardStateConsistency(nbTokenIncorrectGameState1.boardState),
    ).toThrowError("Given game state text contains wrong number of token(s)");
  });

  test("throws an error for p2", () => {
    expect(() =>
      checkBoardStateConsistency(nbTokenIncorrectGameState2.boardState),
    ).toThrowError("Given game state text contains wrong number of token(s)");
  });
});

describe("Entry point 'runConnect4'", () => {
  test("displays a game board with correct game state", () => {
    const consoleSpy = vi.spyOn(console, "log");

    runConnect4(correctGameState.boardState);

    expect(consoleSpy).toHaveBeenCalledWith(correctGameState.boardDisplay);
  });

  test("throws an error with incorrect game state", () => {
    const consoleSpy = vi.spyOn(console, "log");

    expect(() =>
      runConnect4(flyingTokenIncorrectGameState1.boardState),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });
});

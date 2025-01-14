import { expect, test, vi } from "vitest";
import { main } from "./index";
import {
  boardStateToString,
  checkBoardStateConsistency,
  GameState,
  printBoardStateToConsole,
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
`,
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
};

// test("main function", () => {
//   const consoleSpy = vi.spyOn(console, "log");
//   main();
//   expect(consoleSpy).toHaveBeenCalledWith("Hello, world");
//   consoleSpy.mockRestore();
// });

test("boardStateToString", () => {
  expect(boardStateToString(correctGameState.boardState)).toBe(
    correctGameState.boardDisplay,
  );
});

test("printBoardStateToConsole", () => {
  const consoleSpy = vi.spyOn(console, "log");
  const testingString: string = "Test console display";
  printBoardStateToConsole(testingString);
  expect(consoleSpy).toHaveBeenCalledWith(testingString);
});

test("checkBoardStateConsistency flying token 1", () => {
  expect(() =>
    checkBoardStateConsistency(flyingTokenIncorrectGameState1.boardState),
  ).toThrowError("Given game state text contains missplaced token(s)");
});

test("checkBoardStateConsistency flying token 2", () => {
  expect(() =>
    checkBoardStateConsistency(flyingTokenIncorrectGameState2.boardState),
  ).toThrowError("Given game state text contains missplaced token(s)");
});

test("checkBoardStateConsistency nb tokens p1", () => {
  expect(() =>
    checkBoardStateConsistency(nbTokenIncorrectGameState1.boardState),
  ).toThrowError("Given game state text contains wrong number of token(s)");
});

test("checkBoardStateConsistency nb tokens p2", () => {
  expect(() =>
    checkBoardStateConsistency(nbTokenIncorrectGameState2.boardState),
  ).toThrowError("Given game state text contains wrong number of token(s)");
});

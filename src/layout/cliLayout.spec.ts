import { describe, test, expect, vi } from "vitest";
import { GameState, PlayerNum } from "../types/gameState";
import {
  getPlayerTokenChar,
  boardLayout,
  boardStateToString,
  printBoardStateToConsole,
} from "./cliLayout";

describe("Got the player token char with 'getPlayerToken'", () => {
  test("For Player 1'", () => {
    expect(getPlayerTokenChar(PlayerNum.p1)).toBe(boardLayout.PLAYER_ONE_TOKEN);
  });
  test("For Player 2'", () => {
    expect(getPlayerTokenChar(PlayerNum.p2)).toBe(boardLayout.PLAYER_TWO_TOKEN);
  });
  test("For empty space", () => {
    expect(getPlayerTokenChar(PlayerNum.empty)).toBe(boardLayout.EMPTY_TOKEN);
  });
});

test("Got a layouted board using 'boardStateToString'", () => {
  const correctGameState: GameState = {
    boardState: [
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 2, 1, 0, 2, 0, 0],
      [0, 2, 1, 1, 2, 0, 2],
      [0, 1, 1, 2, 1, 1, 1],
      [0, 2, 2, 1, 1, 2, 2],
    ],
    currentPlayer: PlayerNum.p1,
  };
  const boardDisplay = `
+---+---+---+---+---+---+---+
|   |   |   |   | o |   |   |
|   |   |   |   | x |   |   |
|   | x | o |   | x |   |   |
|   | x | o | o | x |   | x |
|   | o | o | x | o | o | o |
|   | x | x | o | o | x | x |
+---+---+---+---+---+---+---+
  1   2   3   4   5   6   7  

-- You are player 1: o --
`;

  expect(boardStateToString(correctGameState)).toBe(boardDisplay);
});

test("Displaying the board using 'printBoardStateToConsole'", () => {
  const consoleSpy = vi.spyOn(console, "log");
  const testingString: string = "Test console display";

  printBoardStateToConsole(testingString);

  expect(consoleSpy).toHaveBeenCalledWith(testingString);
});

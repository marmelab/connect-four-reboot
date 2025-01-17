import { describe, test, expect, vi } from "vitest";
import { GameState, PlayerNum } from "../types/gameState";
import {
  getPlayerTokenChar,
  boardLayout,
  boardGameToString,
  printBoardGameToConsole,
} from "./cliLayout";

describe("Got the player token char with 'getPlayerToken'", () => {
  test("For Player 1'", () => {
    expect(getPlayerTokenChar(PlayerNum.p1, false)).toBe(
      boardLayout.PLAYER_ONE_TOKEN,
    );
  });
  test("For Player 2'", () => {
    expect(getPlayerTokenChar(PlayerNum.p2, false)).toBe(
      boardLayout.PLAYER_TWO_TOKEN,
    );
  });
  test("For empty space", () => {
    expect(getPlayerTokenChar(PlayerNum.empty, false)).toBe(
      boardLayout.EMPTY_TOKEN,
    );
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
    victoryState: {
      player: PlayerNum.empty,
      fourLineCoordinates: [],
      isDraw: false,
    },
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

  expect(boardGameToString(correctGameState)).toBe(boardDisplay);
});

import { describe, expect, it } from "vitest";
import { getWinner } from "./connect4";

describe("getWinner", () => {
  const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const ongoingBoard = [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 0, 0],
    [0, 2, 1, 1, 2, 0, 2],
    [0, 1, 1, 2, 1, 1, 1],
    [0, 2, 2, 1, 1, 2, 2],
  ];
  const drawBoard = [
    [1, 1, 2, 2, 1, 1, 2],
    [2, 2, 1, 1, 2, 2, 1],
    [1, 1, 2, 2, 1, 1, 2],
    [2, 2, 1, 1, 2, 2, 1],
    [1, 1, 2, 2, 1, 1, 2],
    [2, 2, 1, 1, 2, 2, 1],
  ];
  it.each([
    ["empty", emptyBoard, 0],
    ["ongoing", ongoingBoard, 0],
    ["draw", drawBoard, 0],
  ])("should return 0 if the board is %s", (_msg, board, expectedWinner) => {
    expect(getWinner(board)).toBe(expectedWinner);
  });
  const horizontalWin1 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 1, 0, 2, 0, 0],
    [1, 1, 1, 1, 2, 0, 2],
    [2, 1, 1, 2, 1, 1, 1],
    [2, 2, 2, 1, 1, 2, 2],
  ];
  const horizontalWin2 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 2, 0, 1, 0, 0],
    [2, 2, 2, 2, 1, 0, 1],
    [1, 2, 2, 1, 2, 2, 2],
    [1, 1, 1, 2, 2, 1, 1],
  ];
  it.each([
    ["1", horizontalWin1, 1],
    ["2", horizontalWin2, 2],
  ])(
    "should return %s if they have a horizontal four",
    (_msg, board, expectedWinner) => {
      expect(getWinner(board)).toBe(expectedWinner);
    },
  );
  const verticalWin1 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 2, 0, 0],
  ];
  const verticalWin2 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [1, 0, 0, 0, 2, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
  ];
  it.each([
    ["1", verticalWin1, 1],
    ["2", verticalWin2, 2],
  ])(
    "should return %s if they have a vertical four",
    (_msg, board, expectedWinner) => {
      expect(getWinner(board)).toBe(expectedWinner);
    },
  );
  const diagonalWin1 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 1, 2, 1, 0, 0],
    [0, 1, 2, 1, 2, 0, 0],
    [0, 2, 1, 2, 1, 2, 0],
  ];
  const diagonalWin2 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 2, 1, 0, 0],
    [0, 0, 2, 1, 1, 0, 0],
    [0, 2, 1, 1, 2, 0, 0],
    [0, 1, 2, 1, 2, 1, 0],
  ];
  it.each([
    ["1", diagonalWin1, 1],
    ["2", diagonalWin2, 2],
  ])(
    "should return %s if they have a diagonal four",
    (_msg, board, expectedWinner) => {
      expect(getWinner(board)).toBe(expectedWinner);
    },
  );
  const diagonal2Win1 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 2, 1, 0, 0, 0],
    [0, 0, 1, 2, 1, 0, 0],
    [0, 0, 2, 1, 2, 1, 0],
    [0, 2, 1, 2, 1, 2, 0],
  ];
  const diagonal2Win2 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0],
    [0, 0, 1, 2, 0, 0, 0],
    [0, 0, 2, 1, 2, 0, 0],
    [0, 0, 1, 2, 1, 2, 0],
    [0, 1, 2, 1, 2, 1, 0],
  ];
  it.each([
    ["1", diagonal2Win1, 1],
    ["2", diagonal2Win2, 2],
  ])(
    "should return %s if they have a diagonal four",
    (_msg, board, expectedWinner) => {
      expect(getWinner(board)).toBe(expectedWinner);
    },
  );
});

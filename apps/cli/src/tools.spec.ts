import { test, expect } from "vitest";
import { transpose } from "./tools.ts";

test("transpose", () => {
  const boardState = [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 0, 0],
    [0, 2, 1, 1, 2, 0, 2],
    [0, 1, 1, 2, 1, 1, 1],
    [0, 2, 2, 1, 1, 2, 2],
  ];
  const tBoardState = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 1, 2],
    [0, 0, 1, 1, 1, 2],
    [0, 0, 0, 1, 2, 1],
    [1, 2, 2, 2, 1, 1],
    [0, 0, 0, 0, 1, 2],
    [0, 0, 0, 2, 1, 2],
  ];

  expect(transpose(boardState)).toEqual(tBoardState);
});

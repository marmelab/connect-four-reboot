import { describe, expect, test, it, vi } from "vitest";
import {
  checkBoardStateConsistency,
  countNbTokens,
  initGameState,
  playToken,
  getWinner,
  isFull,
  createEmptyBoardState,
} from "./connect4.ts";
import { BoardState, GameState, PlayerNum } from "../types/gameState.ts";
import {
  printBoardGameToConsole,
  boardGameToString,
} from "../../../apps/cli/src/layout/cliLayout.ts";

test("countNbToken", () => {
  const boardState = [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 2, 1, 0, 2, 0, 0],
    [0, 2, 1, 1, 2, 0, 2],
    [0, 1, 1, 2, 1, 1, 1],
    [0, 2, 2, 1, 1, 2, 2],
  ];

  expect(countNbTokens(boardState)).toEqual({
    emptyCount: 20,
    p1Count: 11,
    p2Count: 11,
  });
});

describe("When a board state contains 'flying tokens', it", () => {
  test("throws an error (at position [0,0])", () => {
    const flyingTokenIncorrectBoardState1: BoardState = [
      [1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 2, 1, 0, 2, 0, 0],
      [0, 2, 1, 1, 2, 0, 2],
      [0, 1, 1, 2, 1, 1, 1],
      [0, 2, 2, 1, 1, 2, 2],
    ];
    expect(() =>
      checkBoardStateConsistency(flyingTokenIncorrectBoardState1),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });

  test("throws an error (in the middle of the board game)", () => {
    const flyingTokenIncorrectBoardState2: BoardState = [
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 2, 1, 0, 2, 1, 0],
      [0, 2, 1, 1, 2, 0, 2],
      [0, 1, 1, 2, 1, 1, 1],
      [0, 2, 2, 1, 1, 2, 2],
    ];
    expect(() =>
      checkBoardStateConsistency(flyingTokenIncorrectBoardState2),
    ).toThrowError("Given game state text contains missplaced token(s)");
  });
});

describe("When a board state contains a wrong number of token, it", () => {
  test("throws an error for p1", () => {
    const nbTokenIncorrectBoardState1: BoardState = [
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 2, 1, 0, 2, 0, 0],
      [0, 2, 1, 1, 2, 0, 2],
      [1, 1, 1, 2, 1, 1, 1],
      [1, 2, 2, 1, 1, 2, 2],
    ];
    expect(() =>
      checkBoardStateConsistency(nbTokenIncorrectBoardState1),
    ).toThrowError("Given game state text contains wrong number of token(s)");
  });

  test("throws an error for p2", () => {
    const nbTokenIncorrectBoardState2: BoardState = [
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 2, 1, 0, 2, 2, 0],
      [0, 2, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 1, 1, 1],
      [0, 2, 2, 1, 1, 2, 2],
    ];
    expect(() =>
      checkBoardStateConsistency(nbTokenIncorrectBoardState2),
    ).toThrowError("Given game state text contains wrong number of token(s)");
  });
});

describe("Entry point 'initGameState'", () => {
  test("displays a game board with correct game state", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const correctBoardState: BoardState = [
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 2, 1, 0, 2, 0, 0],
      [0, 2, 1, 1, 2, 0, 2],
      [0, 1, 1, 2, 1, 1, 1],
      [0, 2, 2, 1, 1, 2, 2],
    ];
    const boardDisplay: string = `
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
`;

    printBoardGameToConsole(
      boardGameToString(initGameState(correctBoardState)),
    );

    expect(consoleSpy).toHaveBeenCalledWith(boardDisplay);
  });

  test("throws an error with incorrect game state", () => {
    const flyingTokenIncorrectBoardState1: BoardState = [
      [1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 2, 1, 0, 2, 0, 0],
      [0, 2, 1, 1, 2, 0, 2],
      [0, 1, 1, 2, 1, 1, 1],
      [0, 2, 2, 1, 1, 2, 2],
    ];
    expect(() => initGameState(flyingTokenIncorrectBoardState1)).toThrowError(
      "Given game state text contains missplaced token(s)",
    );
  });

  describe("'playtoken' - When the player place a token ", () => {
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

    const boardDisplayAfterFirstMove = `
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
`;
    test("in a correct column, the game board's display refreshes with the new token", () => {
      const gameState = playToken(correctGameState, 1);
      expect(boardGameToString(gameState)).toBe(boardDisplayAfterFirstMove);
    });

    test("in a full column, an error throws to indicate the problem to the user", () => {
      const colNum: number = 5;
      expect(() => playToken(correctGameState, colNum)).toThrowError(
        `Cannot add token into column ${colNum} which is full.`,
      );
    });
  });
});

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
    expect(getWinner(board)).toStrictEqual({
      player: expectedWinner,
      fourLineCoordinates: [],
      isDraw: isFull(board),
    });
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
      expect(getWinner(board)).toStrictEqual({
        player: expectedWinner,
        fourLineCoordinates: [
          [0, 3],
          [1, 3],
          [2, 3],
          [3, 3],
        ],
        isDraw: false,
      });
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
      expect(getWinner(board)).toStrictEqual({
        player: expectedWinner,
        fourLineCoordinates: [
          [4, 1],
          [4, 2],
          [4, 3],
          [4, 4],
        ],
        isDraw: false,
      });
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
      expect(getWinner(board)).toStrictEqual({
        player: expectedWinner,
        fourLineCoordinates: [
          [1, 4],
          [2, 3],
          [3, 2],
          [4, 1],
        ],
        isDraw: false,
      });
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
      expect(getWinner(board)).toStrictEqual({
        player: expectedWinner,
        fourLineCoordinates: [
          [2, 1],
          [3, 2],
          [4, 3],
          [5, 4],
        ],
        isDraw: false,
      });
    },
  );
});

describe("isFull", () => {
  it("should return false for an empty board", () => {
    expect(
      isFull([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]),
    ).toBe(false);
  });
  it("should return false for an ongoing board", () => {
    expect(
      isFull([
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 2, 1, 0, 2, 0, 0],
        [0, 2, 1, 1, 2, 0, 2],
        [0, 1, 1, 2, 1, 1, 1],
        [0, 2, 2, 1, 1, 2, 2],
      ]),
    ).toBe(false);
  });
  it("should return true for a full board", () => {
    expect(
      isFull([
        [1, 1, 2, 2, 1, 1, 2],
        [2, 2, 1, 1, 2, 2, 1],
        [1, 1, 2, 2, 1, 1, 2],
        [2, 2, 1, 1, 2, 2, 1],
        [1, 1, 2, 2, 1, 1, 2],
        [2, 2, 1, 1, 2, 2, 1],
      ]),
    ).toBe(true);
  });
});

test("When the last token of the board win, it's a full board with a winner", () => {
  expect(
    getWinner([
      [1, 1, 2, 2, 1, 2, 1],
      [2, 2, 1, 1, 2, 2, 1],
      [1, 1, 2, 2, 1, 2, 2],
      [2, 2, 1, 1, 2, 2, 1],
      [1, 1, 2, 2, 1, 1, 2],
      [2, 2, 1, 1, 2, 1, 1],
    ]),
  ).toStrictEqual({
    player: PlayerNum.p2,
    fourLineCoordinates: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
    ],
    isDraw: false,
  });
});

describe("When a board is ", () => {
  it("should return true for a full board without winner", () => {
    expect(
      getWinner([
        [1, 1, 2, 2, 1, 1, 2],
        [2, 2, 1, 1, 2, 2, 1],
        [1, 1, 2, 2, 1, 1, 2],
        [2, 2, 1, 1, 2, 2, 1],
        [1, 1, 2, 2, 1, 1, 2],
        [2, 2, 1, 1, 2, 2, 1],
      ]),
    ).toStrictEqual({
      player: PlayerNum.empty,
      fourLineCoordinates: [],
      isDraw: true,
    });
  });
});

test("Create an empty board state", () => {
  const emptyBoardState: BoardState = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  expect(createEmptyBoardState()).toStrictEqual(emptyBoardState);
});

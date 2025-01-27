import { messages, PLACEHOLDER } from "../config/messages.ts";
import { PlayerNum } from "../../../../packages/shared/types/gameState.ts";
import {
  GameState,
  BoardState,
  VictoryState,
} from "../../../../packages/shared/types/gameState.ts";
import * as fs from "fs";
import { isWinningToken } from "../../../../packages/shared/lib/connect4.ts";

export enum boardLayout {
  TOP = "+---+---+---+---+---+---+---+",
  BOTTOM = "+---+---+---+---+---+---+---+\n  1   2   3   4   5   6   7  ",
  SEPARATOR = "|",
  PLAYER_ONE_TOKEN = "o",
  PLAYER_TWO_TOKEN = "x",
  PLAYER_ONE_WIN_TOKEN = "🅾",
  PLAYER_TWO_WIN_TOKEN = "🅧",
  EMPTY_TOKEN = " ",
  NB_ROWS = 6,
  NB_COLUMN = 7,
  NB_TOKEN_IN_A_FOUR_LINE = 4,
}

export function printBoardGameToConsole(boardState: String): void {
  console.clear();
  console.log(boardState);
}
export function getPlayerTokenChar(
  playerNum: PlayerNum,
  isWInToken: boolean,
): string {
  switch (playerNum) {
    case 1:
      return isWInToken
        ? boardLayout.PLAYER_ONE_WIN_TOKEN
        : boardLayout.PLAYER_ONE_TOKEN;
    case 2:
      return isWInToken
        ? boardLayout.PLAYER_TWO_WIN_TOKEN
        : boardLayout.PLAYER_TWO_TOKEN;
    case 0:
      return boardLayout.EMPTY_TOKEN;
    default:
      return "";
  }
}

export function boardStateToString(
  boardState: BoardState,
  victoryState: VictoryState,
) {
  const resultDisplay: Array<String> = [];

  for (let row = 0; row < boardLayout.NB_ROWS; row++) {
    for (let col = 0; col < boardLayout.NB_COLUMN; col++) {
      resultDisplay.push(
        `${boardLayout.SEPARATOR} ${getPlayerTokenChar(boardState[row][col], isWinningToken(victoryState, col, row))} `,
      );
    }
    resultDisplay.push(`${boardLayout.SEPARATOR}\n`);
  }
  return resultDisplay.join("");
}

export function boardGameToString(gameState: GameState): String {
  const resultDisplay: Array<String> = [];

  // Board
  resultDisplay.push(`\n${boardLayout.TOP}\n`);
  resultDisplay.push(
    boardStateToString(gameState.boardState, gameState.victoryState),
  );

  resultDisplay.push(`${boardLayout.BOTTOM}\n`);

  // Player information :
  // with a DRAW
  if (gameState.victoryState.isDraw) {
    resultDisplay.push(`${messages.DRAW_MESSAGE}`);
  }
  // during game
  else if (gameState.victoryState.player === PlayerNum.empty) {
    resultDisplay.push(
      `${messages.INFORMATIONS.replace(
        PLACEHOLDER,
        gameState.currentPlayer.toString(),
      ).replace(
        PLACEHOLDER,
        getPlayerTokenChar(gameState.currentPlayer, false),
      )}\n`,
    );
  }
  // with a WIN
  else {
    resultDisplay.push(
      `${messages.WINNER_MESSAGE.replace(
        PLACEHOLDER,
        gameState.victoryState.player.toString(),
      ).replace(
        PLACEHOLDER,
        getPlayerTokenChar(gameState.victoryState.player, false),
      )}\n`,
    );
  }
  return resultDisplay.join("");
}

export function asciiArtIntro() {
  const content = fs.readFileSync("./asciiart.txt", "utf-8");

  console.log(content);
}

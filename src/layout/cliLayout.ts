import { messages, PLACEHOLDER } from "../config/messages.js";
import { PlayerNum } from "../types/gameState.js";
import { GameState } from "../types/gameState";

export enum boardLayout {
  TOP = "+---+---+---+---+---+---+---+",
  BOTTOM = "+---+---+---+---+---+---+---+\n  1   2   3   4   5   6   7  ",
  SEPARATOR = "|",
  PLAYER_ONE_TOKEN = "o",
  PLAYER_TWO_TOKEN = "x",
  EMPTY_TOKEN = " ",
  NB_ROWS = 6,
  NB_COLUMN = 7,
}

export function printBoardStateToConsole(boardState: String): void {
  console.clear();
  console.log(boardState);
}
export function getPlayerTokenChar(playerNum: PlayerNum): string {
  switch (playerNum) {
    case 1:
      return boardLayout.PLAYER_ONE_TOKEN;
    case 2:
      return boardLayout.PLAYER_TWO_TOKEN;
    case 0:
      return boardLayout.EMPTY_TOKEN;
    default:
      return "";
  }
}

export function boardStateToString(gameState: GameState): String {
  const resultDisplay: Array<String> = [];

  resultDisplay.push(`\n${boardLayout.TOP}\n`);

  gameState.boardState.forEach((line: Array<number>) => {
    line.forEach((token: number) => {
      resultDisplay.push(
        `${boardLayout.SEPARATOR} ${getPlayerTokenChar(token)} `,
      );
    });
    resultDisplay.push(`${boardLayout.SEPARATOR}\n`);
  });

  resultDisplay.push(`${boardLayout.BOTTOM}\n`);

  // Player information
  if (gameState.winner !== PlayerNum.empty) {
    resultDisplay.push(
      `${messages.WINNER_MESSAGE.replace(
        PLACEHOLDER,
        gameState.currentPlayer.toString(),
      ).replace(PLACEHOLDER, getPlayerTokenChar(gameState.currentPlayer))}\n`,
    );
  } else {
    resultDisplay.push(
      `${messages.INFORMATIONS.replace(
        PLACEHOLDER,
        gameState.currentPlayer.toString(),
      ).replace(PLACEHOLDER, getPlayerTokenChar(gameState.currentPlayer))}\n`,
    );
  }
  return resultDisplay.join("");
}

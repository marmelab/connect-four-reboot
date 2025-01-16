import * as readline from "readline";
import { messages, PLACEHOLDER } from "./config/messages.js";
import { getPlayerTokenChar, boardLayout } from "./layout/cliLayout.js";
import { GameState, PlayerNum } from "./types/gameState.js";

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(text: string) {
  return new Promise((resolve) => {
    rl.question(text, resolve);
  });
}

export async function readNextPlay(): Promise<number> {
  let isAnswerValid = false;
  let numAnswer: number = -1;

  while (!isAnswerValid) {
    const answer = await question(
      messages.PROMPT.replace(PLACEHOLDER, getPlayerTokenChar(PlayerNum.p1)),
    );
    numAnswer = Number(answer);
    if (
      isNaN(numAnswer) ||
      numAnswer <= 0 ||
      numAnswer > boardLayout.NB_COLUMN
    ) {
      console.error(messages.ERROR_INVALID_COLUMN_NUMBER);
    } else {
      isAnswerValid = true;
    }
  }
  return numAnswer;
}

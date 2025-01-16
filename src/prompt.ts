import * as readline from "readline";
import { messages, PLACEHOLDER } from "./config/messages.js";
import { getPlayerTokenChar, boardLayout } from "./layout/cliLayout.js";
import { GameState, PlayerNum } from "./types/gameState.js";

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function closePrompt() {
  rl.close();
}

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
      messages.PROMPT_ASK_COLUMN.replace(
        PLACEHOLDER,
        getPlayerTokenChar(PlayerNum.p1),
      ),
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

export async function readForNextRound(): Promise<boolean> {
  let isAnswerValid = false;
  let answer = "";

  while (!isAnswerValid) {
    answer = (await question(messages.PROMPT_ASK_NEXT_ROUND)) + "";
    if (answer.length !== 1 || "YyNn".indexOf(answer) < 0) {
      console.error(messages.ERROR_INVALID_NEXT_ROUND_ANSWER);
    } else {
      isAnswerValid = true;
    }
  }
  return answer.toUpperCase() === "Y";
}

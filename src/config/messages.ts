export const PLACEHOLDER = "$";
export const messages = {
  INFORMATIONS:
    "\n-- You are player " + PLACEHOLDER + ": " + PLACEHOLDER + " --",
  PROMPT_ASK_COLUMN:
    "Please enter the column number you want to play your token $ [1-7]: ",
  PROMPT_ASK_NEXT_ROUND: "Ready for another round? [Y|N]: ",
  ERROR_INVALID_COLUMN_NUMBER: "Invalid column number.\n",
  ERROR_COLUMN_FULL: "Cannot add token into column $ which is full.\n",
  WINNER_MESSAGE:
    "\n-- Player " + PLACEHOLDER + ": " + PLACEHOLDER + " Win! --",
  ERROR_INVALID_NEXT_ROUND_ANSWER:
    "Invalid answer, please tip Y if you want another round, otherwise N.",
};

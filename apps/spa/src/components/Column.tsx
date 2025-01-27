import React from "react";
import Square from "@components/Square";
import { PlayerNum } from "../../../../packages/shared/types/gameState";
import { transpose } from "../../../../packages/shared/tools/tools";
import { isWinningToken } from "../../../../packages/shared/lib/connect4";
import { Game } from "../../../../packages/shared/types/gameState";
import { runPlayToken } from "@services/api";

interface ColumnProps {
  game: Game;
  index: number;
  onColumnClick: () => void;
  playerNum: PlayerNum;
}

const Column = ({ game, index, onColumnClick, playerNum }: ColumnProps) => {
  const isPlayerTurn =
    (game.gameState.currentPlayer === PlayerNum.p1 &&
      playerNum === PlayerNum.p1) ||
    (!(game.gameState.currentPlayer === PlayerNum.p1) &&
      playerNum === PlayerNum.p2);

  const isGameFinished =
    game.gameState.victoryState.isDraw ||
    game.gameState.victoryState.player !== PlayerNum.empty;

  const transposedBoard = transpose(game.gameState.boardState);

  const handleClick = async () => {
    if (game.gameState.victoryState.player !== PlayerNum.empty) {
      alert("The game is over.");
      return;
    }
    if (!isPlayerTurn) {
      alert("It's not your turn.");
      return;
    }
    try {
      const column = index + 1;
      await runPlayToken(game.id, column);
      onColumnClick();
    } catch (error) {
      console.error("Error while playing token:", error);
      alert("An error occurred while playing the token.");
    }
  };

  return (
    <div
      className={`column ${!isPlayerTurn || isGameFinished ? "disabled" : ""}`}
      onClick={isPlayerTurn ? handleClick : undefined}
    >
      {transposedBoard[index].map((value, y) => (
        <Square
          value={value}
          x={index}
          y={y}
          isWinningToken={isWinningToken(game.gameState.victoryState, index, y)}
          key={`square${index}${y}`}
        />
      ))}
    </div>
  );
};

export default Column;

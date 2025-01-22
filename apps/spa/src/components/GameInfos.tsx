import { tokenColors } from "../consts";
import {
  PlayerNum,
  type GameState,
} from "../../../../packages/shared/types/gameState";

interface GameInfosProps {
  gameState: GameState;
}

const GameInfos = ({ gameState }: GameInfosProps) => {
  return (
    <div className="active-player">
      {gameState.victoryState.isDraw ? (
        <span>It's a draw ! </span>
      ) : gameState.victoryState.player !== PlayerNum.empty ? (
        <>
          <span>Player</span>
          <div
            className={`circle small active ${tokenColors[gameState.victoryState.player]}`}
          ></div>
          <span>win !</span>
        </>
      ) : (
        <>
          <span>Active player: </span>
          <div
            className={`circle small active ${tokenColors[gameState.currentPlayer]}`}
          ></div>
        </>
      )}
    </div>
  );
};

export default GameInfos;

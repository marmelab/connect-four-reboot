import { tokenColors } from "../consts";
import {
  PlayerNum,
  type GameState,
} from "../../../../packages/shared/types/gameState";

interface GameInfosProps {
  gameState: GameState;
}

const getDrawInfos = () => {
  return (
    <div className="game-infos">
      <span>It's a draw ! </span>
    </div>
  );
};

const getWinInfos = (player: PlayerNum) => {
  return (
    <div className="game-infos">
      <span>Player</span>
      <div className={`circle small active ${tokenColors[player]}`}></div>
      <span>win !</span>
    </div>
  );
};

const getCurrentPlayerInfos = (player: PlayerNum) => {
  return (
    <div className="game-infos">
      <span>Active player: </span>
      <div className={`circle small active ${tokenColors[player]}`}></div>
    </div>
  );
};

const GameInfos = ({ gameState }: GameInfosProps) => {
  if (gameState.victoryState.isDraw) {
    return getDrawInfos();
  } else if (gameState.victoryState.player !== PlayerNum.empty) {
    return getWinInfos(gameState.victoryState.player);
  } else {
    return getCurrentPlayerInfos(gameState.currentPlayer);
  }
};

export default GameInfos;

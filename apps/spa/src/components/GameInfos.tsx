import { tokenColors } from "../consts";
import {
  PlayerNum,
  type GameState,
} from "../../../../packages/shared/types/gameState";

interface GameInfosProps {
  gameState: GameState;
  playerNum: PlayerNum;
  isSameScreen: boolean;
}

const getInfoWhoIsPlaying = (
  gameState: GameState,
  playerNum: PlayerNum,
  isSameScreen: boolean,
) => {
  if (gameState.currentPlayer === playerNum || isSameScreen) {
    return (
      <>
        <div className="player-infos">
          <div
            className={`circle small active ${tokenColors[gameState.currentPlayer]}`}
          ></div>
          <span> it's your turn 🎯 </span>
        </div>
      </>
    );
  }
  return (
    <div className="player-infos">
      <div
        className={`circle small active ${tokenColors[gameState.currentPlayer]}`}
      ></div>
      <span> waiting for your opponent ⏳ </span>
      <img src="src/assets/spinner-black.gif" alt="Loading..." />
    </div>
  );
};

const getDrawInfos = () => {
  return (
    <div className="player-infos">
      <div className={`circle small active ${tokenColors[PlayerNum.p1]}`}></div>
      <div className={`circle small active ${tokenColors[PlayerNum.p2]}`}></div>
      <span> it's a draw 🤷 ... </span>
    </div>
  );
};

const getWinInfos = (
  winner: PlayerNum,
  player: PlayerNum,
  isSameScreen: boolean,
) => {
  if (player === winner || isSameScreen) {
    return (
      <div className="player-infos">
        <div className={`circle small active ${tokenColors[winner]}`}></div>
        <span> You win 🥇 ! </span>
      </div>
    );
  } else {
    return (
      <div className="player-infos">
        <div className={`circle small active ${tokenColors[player]}`}></div>
        <span> You Loose 💔 ...</span>
      </div>
    );
  }
};

const GameInfos = ({ gameState, playerNum, isSameScreen }: GameInfosProps) => {
  if (gameState.victoryState.isDraw) {
    return <div className="game-infos">{getDrawInfos()}</div>;
  } else if (gameState.victoryState.player !== PlayerNum.empty) {
    return (
      <div className="game-infos">
        {getWinInfos(gameState.victoryState.player, playerNum, isSameScreen)}
      </div>
    );
  } else {
    return (
      <div className="game-infos">
        {getInfoWhoIsPlaying(gameState, playerNum, isSameScreen)}
      </div>
    );
  }
};

export default GameInfos;

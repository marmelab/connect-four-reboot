import { tokenColors } from "../consts";
import {
  PlayerNum,
  type GameState,
} from "../../../../packages/shared/types/gameState";

interface GameInfosProps {
  gameState: GameState;
  playerNum: PlayerNum;
}

const getInfoWhoIsPlaying = (gameState: GameState, playerNum: PlayerNum) => {
  if (gameState.currentPlayer === playerNum) {
    return (
      <>
        <div className="player-infos">
          <div
            className={`circle small active ${tokenColors[playerNum]}`}
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

const getWinInfos = (winner: PlayerNum, player: PlayerNum) => {
  if (player === winner) {
    return (
      <div className="player-infos">
        <div className={`circle small active ${tokenColors[player]}`}></div>
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

const GameInfos = ({ gameState, playerNum }: GameInfosProps) => {
  if (gameState.victoryState.isDraw) {
    return <div className="game-infos">{getDrawInfos()}</div>;
  } else if (gameState.victoryState.player !== PlayerNum.empty) {
    return (
      <div className="game-infos">
        {getWinInfos(gameState.victoryState.player, playerNum)}
      </div>
    );
  } else {
    return (
      <div className="game-infos">
        {getInfoWhoIsPlaying(gameState, playerNum)}
      </div>
    );
  }
};

export default GameInfos;

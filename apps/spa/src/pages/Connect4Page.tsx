import React, { useCallback, useEffect, useState } from "react";
import GameGrid from "@components/GameGrid";
import { useSearchParams } from "react-router-dom";
import {
  PlayerNum,
  type Game,
} from "../../../../packages/shared/types/gameState";
import ShareButton from "@components/ShareButton";
import { getGame, getGameStateVersion } from "@services/api";
import GameInfos from "@components/GameInfos";

export const PLAYER_NUM_QP = "playerNum";
export const GAME_ID_QP = "gameId";
export const SHARED_GAME_ID_QP = "sharedGameId";

async function isGameStateNeedsUpdate(game: Game): Promise<boolean> {
  try {
    const { stateVersion: newStateVersion } = await getGameStateVersion(
      game.id,
    );
    return game.stateVersion !== newStateVersion;
  } catch (error) {
    console.error("Error checking state version:", error);
    return false;
  }
}

const Connect4Page: React.FC = () => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get(GAME_ID_QP);
  const playerNumParam = searchParams.get(PLAYER_NUM_QP);

  const [game, setGame] = useState<Game | null>(null);
  const [playerNum, setPlayerNum] = useState<PlayerNum | null>(null);

  const updateGame = useCallback(async (gameId: string) => {
    try {
      const updatedGame = await getGame(gameId);
      setGame(updatedGame);
    } catch (error) {
      console.error("Failed to update game:", error);
    }
  }, []);

  // Load player num.
  // The game is always started by player1, and shared to player2.
  // The API chooses the first player at random (P1 or P2).
  useEffect(() => {
    if (!playerNumParam) {
      setPlayerNum(PlayerNum.p1);
      return;
    }

    try {
      const playerNum: PlayerNum = JSON.parse(
        decodeURIComponent(playerNumParam),
      );
      setPlayerNum(playerNum);
    } catch (error) {
      console.error("Failed to parse playerNum from URL:", error);
      alert("Invalid player number in URL.");
    }
  }, [playerNumParam]);

  // Long polling to refresh game state every 2 seconds
  useEffect(() => {
    const isGameFinished =
      game &&
      (game.gameState.victoryState.isDraw ||
        game.gameState.victoryState.player != PlayerNum.empty);

    if (!gameId || isGameFinished) {
      return;
    }

    const pollGameState = async () => {
      if (!game) {
        await updateGame(gameId);
      } else {
        const needsUpdate = await isGameStateNeedsUpdate(game);
        if (needsUpdate) {
          await updateGame(gameId);
        }
      }
    };

    const intervalId = setInterval(pollGameState, 2000);
    return () => clearInterval(intervalId);
  }, [game, gameId, updateGame]);

  if (!game || !playerNum) {
    return <p>Loading game ...</p>;
  }

  const currentUrl = `${window.location.origin}?${SHARED_GAME_ID_QP}=${game.id}&${PLAYER_NUM_QP}=${PlayerNum.p2}`;

  return (
    <div id="connect4page">
      <div id="title-container">
        <GameInfos gameState={game.gameState} playerNum={playerNum} />
        <ShareButton url={currentUrl} />
      </div>
      <GameGrid
        game={game}
        playerNum={playerNum}
        onGridClick={() => {
          updateGame(`${gameId}`);
        }}
      />
    </div>
  );
};

export default Connect4Page;

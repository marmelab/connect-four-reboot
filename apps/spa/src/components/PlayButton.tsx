import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "@services/api";
import { Game } from "../../../../packages/shared/types/gameState";

interface PlayButtonProps {
  actionText: string;
  navigateTo: string;
  color: string;
  urlParameters: Record<string, string>;
}

const initGame = async (gameParams: Record<string, string>): Promise<Game> => {
  const boardState = gameParams.boardState || null;

  return await createGame(boardState);
};

const PlayButton = ({
  actionText,
  navigateTo,
  color,
  urlParameters: gameParams,
}: PlayButtonProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const game = await initGame(gameParams);
      const urlParams = new URLSearchParams(
        gameParams as Record<string, string>,
      );
      if (!gameParams?.gameId) {
        urlParams.append("gameId", `${game.id}`);
      }

      navigate(`${navigateTo}?${urlParams.toString()}`);
    } catch (err) {
      setError(`Failed to create the game. Please try again. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="play-button-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        className={`play-button ${color}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Loading..." : `🎮 ${actionText} 🎮`}
      </button>
    </div>
  );
};

export default PlayButton;

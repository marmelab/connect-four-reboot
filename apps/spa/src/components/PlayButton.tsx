import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "@services/api";
import { Game } from "../../../../packages/shared/types/gameState";

interface PlayButtonProps {
  actionText: string;
  navigateTo: string;
  color: string;
  boardState?: string | null;
}

const PlayButton = ({
  actionText,
  navigateTo,
  color,
  boardState,
}: PlayButtonProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const game: Game = await createGame(boardState || null);
      const gameParam = encodeURIComponent(JSON.stringify(game));

      navigate(`${navigateTo}?game=${gameParam}`);
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

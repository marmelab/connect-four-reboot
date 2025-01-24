import React from "react";
import { useNavigate } from "react-router-dom";

interface PlayButtonProps {
  actionText: string;
  navigateTo: string;
  color: string;
}

const PlayButton = ({ actionText, navigateTo, color }: PlayButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <div className="play-button-container">
      <button className={`play-button ${color}`} onClick={handleClick}>
        🎮 &nbsp; {actionText} &nbsp; 🎮
      </button>
    </div>
  );
};

export default PlayButton;

import Column from "@components/Column";
import { transpose } from "../../../../packages/shared/tools/tools";
import type {
  Game,
  PlayerNum,
} from "../../../../packages/shared/types/gameState";

interface GameGridProps {
  game: Game;
  onGridClick: () => void;
  playerNum: PlayerNum;
}

const GameGrid = ({ game, playerNum, onGridClick }: GameGridProps) => {
  const columns = transpose(game.gameState.boardState);

  return (
    <div>
      <div id="game-grid">
        <div id="grid-container">
          {columns.map((_, index) => (
            <Column
              game={game}
              index={index}
              key={`column${index}`}
              playerNum={playerNum}
              onColumnClick={onGridClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;

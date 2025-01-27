import PlayButton from "@components/PlayButton";
import { tokenColors } from "../consts";
import { useSearchParams } from "react-router-dom";
import { PlayerNum } from "../../../../packages/shared/types/gameState";

function Home() {
  const renderSharedGameCase = (sharedGameId: string) => {
    return (
      <>
        <div>
          <h1>Welcome</h1>
          <h2>You have been invited to play part {sharedGameId}</h2>
          <PlayButton
            actionText="OK, join the game !"
            navigateTo="/connect4page"
            color={tokenColors[1]}
            urlParameters={{
              gameId: sharedGameId,
              playerNum: `${PlayerNum.p2}`,
            }}
          />
        </div>
      </>
    );
  };

  const renderNewGamecase = () => {
    return (
      <div>
        <h1>Welcome to Connect 4 Reboot !</h1>
        <h2> Play with a remote opponent:</h2>
        <div className="play-buttons">
          <PlayButton
            actionText="2-player game - remote - Empty board"
            navigateTo="/connect4page"
            color={tokenColors[1]}
            urlParameters={{}}
          />
          <PlayButton
            actionText="2-player game - remote - Pre-loaded board"
            navigateTo="/connect4page"
            color={tokenColors[2]}
            urlParameters={{
              boardState:
                "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,2,1,0,2,0,0,1,2,2,2,1,0,1,1,2,1,1,1,2,2,2",
            }}
          />
        </div>
        <h2> Play on the same screen:</h2>
        <div className="play-buttons">
          <PlayButton
            actionText="2-player game - same screen - Empty board"
            navigateTo="/connect4page"
            color={tokenColors[1]}
            urlParameters={{
              isSameScreen: "true",
            }}
          />
          <PlayButton
            actionText="2-player game - same screen - Pre-loaded board"
            navigateTo="/connect4page"
            color={tokenColors[2]}
            urlParameters={{
              isSameScreen: "true",
              boardState:
                "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,2,1,0,2,0,0,1,2,2,2,1,0,1,1,2,1,1,1,2,2,2",
            }}
          />
        </div>
      </div>
    );
  };

  const [searchParams] = useSearchParams();
  const sharedGameId = searchParams.get("sharedGameId");

  if (sharedGameId) {
    return renderSharedGameCase(sharedGameId);
  } else {
    return renderNewGamecase();
  }
}

export default Home;

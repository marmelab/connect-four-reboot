import PlayButton from "@components/PlayButton";
import { tokenColors } from "../consts";

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <PlayButton
        actionText="2-player game - Same screen - Empty board"
        navigateTo="/connect4page"
        color={tokenColors[1]}
        boardState={null}
      />
      <PlayButton
        actionText="2-player game - Same screen - Pre-loaded board"
        navigateTo="/connect4page"
        color={tokenColors[2]}
        boardState="0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,2,1,0,2,0,0,1,2,2,2,1,0,1,1,2,1,1,1,2,2,2"
      />
    </div>
  );
}

export default Home;

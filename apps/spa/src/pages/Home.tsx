import { useEffect, useState } from "react";
import { ApiResponse, fetchHelloWorld } from "@services/api";
import PlayButton from "@components/PlayButton";
import { tokenColors } from "../consts";

function Home() {
  const [res, setRes] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: ApiResponse = await fetchHelloWorld();
        setRes(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      <PlayButton
        actionText="2-player game - Same screen - Empty board"
        navigateTo="/connect4page"
        color={tokenColors[1]}
      />
      <PlayButton
        actionText="2-player game - Same screen - Pre-loaded board"
        navigateTo="/connect4page?state=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C0%2C0%2C0%2C0%2C0%2C2%2C2%2C1%2C0%2C2%2C0%2C0%2C1%2C2%2C2%2C2%2C1%2C0%2C1%2C1%2C2%2C1%2C1%2C1%2C2%2C2%2C2"
        color={tokenColors[2]}
      />
      {/* <span>{res?.hello}</span> */}
    </div>
  );
}

export default Home;

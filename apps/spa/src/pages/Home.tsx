import { useEffect, useState } from "react";
import { ApiResponse, fetchHelloWorld } from "@services/api";

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
      <h1>Home</h1>
      <span>{res?.hello}</span>
    </div>
  );
}

export default Home;

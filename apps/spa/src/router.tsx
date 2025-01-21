import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Connect4Page from "@pages/Connect4Page";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="connect4Page" element={<Connect4Page />} />
      </Routes>
    </BrowserRouter>
  );
}

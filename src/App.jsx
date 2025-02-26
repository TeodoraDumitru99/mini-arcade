import TicTacToe from "./components/tic_tac_toe/TicTacToe";
import Memory from "./components/memory/Memory";
import Hero from "./components/hero/Hero";
import Rock from "./components/rock_paper_scissor/RockPaperScissor";
import Games from "./components/games/Games";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/games" element={<Games />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/cardmemory" element={<Memory />} />
            <Route path="/rockpaperscissors" element={<Rock />} />
          </Routes>
        </main>
      </>
    </Router>
  );
}

export default App;

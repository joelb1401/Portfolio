import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Game from "./components/Game";
import Portfolio from "./components/Portfolio";

const App = () => {
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('montyHallCompleted') === 'true';
    setGameCompleted(completed);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={gameCompleted ? <Navigate to="/portfolio" replace /> : <Game />}
        />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
import React, { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import Portfolio from "./components/Portfolio";

const RedirectIfCompleted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completed = localStorage.getItem('montyHallCompleted') === 'true';
    if (completed) {
      navigate('/portfolio');
    }
  }, [navigate]);

  return <Game />;
};

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<RedirectIfCompleted />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Game from "./components/Game";
import Portfolio from "./components/Portfolio";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
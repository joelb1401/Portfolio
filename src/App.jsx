import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Game from "./components/Game";
import Portfolio from "./components/Portfolio";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Portfolio/" element={<Game />} />
        <Route path="/Portfolio/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/Portfolio/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
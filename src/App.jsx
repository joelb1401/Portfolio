import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Game from "./components/Game";
import Portfolio from "./components/Portfolio";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
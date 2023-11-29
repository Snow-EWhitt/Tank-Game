import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Navbar } from "./components/Navbar";
import "bootstrap";
import "./assets/custom.scss";
import { StartGame } from "./pages/startGame/StartGame";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/Game" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

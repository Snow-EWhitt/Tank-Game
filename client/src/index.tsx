import "bootstrap";
import "./assets/custom.scss";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import TankContextProvider from "./components/Tank/TankContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalMatch } from "./pages/localMatch/LocalMatch";
import { Navbar } from "./components/Navbar";
import { StartGamePage } from "./pages/startGame/StartGamePage";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";
import { AuthRequired } from "./AuthRequired";
import { GameMode } from "./pages/gameMode/GameMode";
import { OnlineOptions } from "./pages/onlineOptions/OnlineOptions";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const oidcConfig = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: "https://tankbattleskeycloak.duckdns.org:10101/realms/dev",
  client_id: "tank_battles",
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
};

root.render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={true} />
    <AuthProvider {...oidcConfig}>
      <AuthRequired>
        <TankContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<GameMode />} />
              <Route path="/Local" element={<StartGamePage />} />
              <Route path="/Local/Game" element={<LocalMatch />} />
              <Route path="/Online" element={<OnlineOptions />} />
            </Routes>
          </Router>
        </TankContextProvider>
      </AuthRequired>
    </AuthProvider>
  </React.StrictMode>
);

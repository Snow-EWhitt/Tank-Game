import "bootstrap";
import "./assets/custom.scss";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import TankContextProvider from "./components/Tank/TankContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Navbar } from "./components/Navbar";
import { StartGamePage } from "./pages/startGame/StartGamePage";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";
import { AuthRequired } from "./AuthRequired";

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
    <AuthProvider {...oidcConfig}>
      <TankContextProvider>
        <AuthRequired>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<StartGamePage />} />
              <Route path="/Game" element={<Home />} />
            </Routes>
          </Router>
        </AuthRequired>
      </TankContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

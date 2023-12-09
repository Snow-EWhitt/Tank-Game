import { useState } from "react";
import OnlineClientContextProvider from "../../components/contexts/OnlineClientContext";
import { HostMatch } from "../onlineMatch/HostMatch";
import OnlineHostContextProvider from "../../components/contexts/OnlineHostContext";
import { ClientMatch } from "../onlineMatch/ClientMatch";

export const OnlineOptions = () => {
  const [isServer, setIsServer] = useState<boolean | null>(null);

  const createGame = () => {
    setIsServer(true);
  };

  const joinGame = () => {
    setIsServer(false);
  };

  return (
    <div className="container">
      {isServer == null && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "calc(100vh - 46px)" }}
        >
          <button className="btn btn-success m-5" onClick={createGame}>
            Create Game
          </button>
          <button className="btn btn-success m-5" onClick={joinGame}>
            Join Game
          </button>
        </div>
      )}

      {isServer && (
        <OnlineHostContextProvider>
          <h1>Host</h1>
          <HostMatch />
        </OnlineHostContextProvider>
      )}

      {!isServer && isServer != null && (
        <OnlineClientContextProvider>
          <h1>Client</h1>
          <ClientMatch />
        </OnlineClientContextProvider>
      )}
    </div>
  );
};

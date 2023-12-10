import Constants, { GameState } from "../constants";
import { OnlineTankRenderer } from "../../components/OnlineTankRenderer";
import { OnlineHostContext } from "../../components/contexts/OnlineHostContext";
import { OnlineProjectileRenderer } from "../../components/OnlineProjectileRenderer";
import { useContext } from "react";
import { MatchEnd } from "../matchEnd/MatchEnd";

export const HostMatch = () => {
  const hostContext = useContext(OnlineHostContext);

  const startGame = () => {
    hostContext.updateState(GameState.Playing);
  };

  return (
    <div className="container">
      {!(hostContext.state === GameState.Ended) ? (
        <div className="row mt-4 justify-content-center">
          <div
            className="col-auto bg-white position-relative p-0"
            style={{
              width: `${Constants.boundaryWidth}px`,
              height: `${Constants.boundaryHeight}px`,
            }}
          >
            {hostContext.state === GameState.Joining && (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                {hostContext.tanks.length <= 1 ? (
                  <p className="fs-4 text-black">
                    Waiting for player 2 to join...
                  </p>
                ) : (
                  <button className="btn btn-success" onClick={startGame}>
                    Start Game
                  </button>
                )}
              </div>
            )}

            <OnlineTankRenderer context={OnlineHostContext} tankId={0} />
            <OnlineProjectileRenderer context={OnlineHostContext} />
          </div>
        </div>
      ) : (
        <MatchEnd winner={hostContext.tanks[0]} />
      )}
    </div>
  );
};

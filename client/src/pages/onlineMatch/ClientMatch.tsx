import { OnlineTankRenderer } from "../../components/OnlineTankRenderer";
import { OnlineClientContext } from "../../components/contexts/OnlineClientContext";
import { OnlineProjectileRenderer } from "../../components/OnlineProjectileRenderer";
import Constants, { GameState } from "../constants";
import { useContext } from "react";
import { MatchEnd } from "../matchEnd/MatchEnd";

export const ClientMatch = () => {
  const clientContext = useContext(OnlineClientContext);

  return (
    <div className="container">
      {!(clientContext.state === GameState.Ended) ? (
        <div className="row mt-4 justify-content-center">
          <div
            className="col-auto bg-white position-relative p-0"
            style={{
              width: `${Constants.boundaryWidth}px`,
              height: `${Constants.boundaryHeight}px`,
            }}
          >
            {clientContext.state === GameState.Joining && (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <p className="fs-4 text-black">
                  Waiting for host to start game...
                </p>
              </div>
            )}
            <OnlineTankRenderer context={OnlineClientContext} tankId={1} />
            <OnlineProjectileRenderer context={OnlineClientContext} />
          </div>
        </div>
      ) : (
        <MatchEnd winner={clientContext.tanks[0]} />
      )}
    </div>
  );
};

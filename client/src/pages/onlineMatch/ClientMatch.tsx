import { OnlineTankRenderer } from "../../components/OnlineTankRenderer";
import { OnlineClientContext } from "../../components/contexts/OnlineClientContext";
import { OnlineProjectileRenderer } from "../../components/OnlineProjectileRenderer";
import Constants from "../constants";

export const ClientMatch = () => {
  return (
    <div className="container">
      <div className="row mt-4 justify-content-center">
        <div
          className="col-auto bg-white position-relative p-0"
          style={{
            width: `${Constants.boundaryWidth}px`,
            height: `${Constants.boundaryHeight}px`,
          }}
        >
          <OnlineTankRenderer context={OnlineClientContext} tankId={1} />
          <OnlineProjectileRenderer context={OnlineClientContext} />
        </div>
      </div>
    </div>
  );
};

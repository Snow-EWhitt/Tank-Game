import Constants from "../../constants";
import { OnlineTankRenderer } from "../../components/OnlineTankRenderer";
import { OnlineHostContext } from "../../components/contexts/OnlineHostContext";
import { OnlineProjectileRenderer } from "../../components/OnlineProjectileRenderer";

export const HostMatch = () => {
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
          <OnlineTankRenderer context={OnlineHostContext} tankId={0} />
          <OnlineProjectileRenderer context={OnlineHostContext} />
        </div>
      </div>
    </div>
  );
};

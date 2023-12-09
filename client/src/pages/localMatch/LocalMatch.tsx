import { useContext } from "react";
import { ProjectileRenderer } from "../../components/ProjectileRenderer";
import { TankRenderer } from "../../components/TankRenderer";
import { TankContext } from "../../components/Tank/TankContext";
import { MatchEndPage } from "../matchEnd/MatchEndPage";
import Constants from "../constants";

export const LocalMatch = () => {
  const tankContext = useContext(TankContext);
  const tanks = tankContext.tanks;

  return (
    <div className="container">
      {tanks.length >= 2 && (
        <div className="row mt-4 justify-content-center">
          <div
            className="col-auto bg-white position-relative p-0"
            style={{
              width: `${Constants.boundaryWidth}px`,
              height: `${Constants.boundaryHeight}px`,
            }}
          >
            <TankRenderer />
            <ProjectileRenderer />
          </div>
        </div>
      )}

      {tanks.length === 1 && (
        <MatchEndPage winner={tanks[0]} />
      )}
    </div>
  );
};

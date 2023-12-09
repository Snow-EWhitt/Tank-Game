import { useContext } from "react";
import { ProjectileRenderer } from "../../components/ProjectileRenderer";
import { TankRenderer } from "../../components/TankRenderer";
import { TankContext } from "../../components/Tank/TankContext";
import { MatchEnd } from "../matchEnd/MatchEnd";
import Constants from "../constants";
import { useNavigate } from "react-router-dom";

export const LocalMatch = () => {
  const tankContext = useContext(TankContext);
  const navigate = useNavigate();
  const tanks = tankContext.tanks;

  const playAgain = () => {
    navigate("/Local");
  };

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

      {tanks.length === 1 && <MatchEnd winner={tanks[0]} handler={playAgain} />}
    </div>
  );
};

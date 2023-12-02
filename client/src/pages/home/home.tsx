import Constants from "../../Constants";
import { ProjectileRenderer } from "../../components/ProjectileRenderer";
import { TankRenderer } from "../../components/TankRenderer";

export const Home = () => {
  return (
    <div className="container">
      <div className="row mt-4 justify-content-center">
        <div
          className="col-auto bg-white position-relative p-0"
          style={{ width: `${Constants.boundaryWidth}px`, height: `${Constants.boundaryHeight}px` }}
        >
          <TankRenderer />
          <ProjectileRenderer />
        </div>
      </div>
    </div>
  );
};

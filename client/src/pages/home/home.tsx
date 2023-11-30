import TankContextProvider from "../../components/Tank/TankContext";
import { TankControls } from "../../components/Tank/TankControls";

export const Home = () => {
  return (
    <TankContextProvider>
      <div className="container">
        <div className="row mt-4 justify-content-center">
          <div
            className="col-auto bg-white position-relative"
            style={{ width: "1000px", height: "500px" }}
          >
            <TankControls
              forwardKey="w"
              backwardKey="s"
              turnRightKey="d"
              turnLeftKey="a"
              turnBarrelRightKey="e"
              turnBarrelLeftKey="q"
              fireGunKey=" "
            />
          </div>
        </div>
      </div>
    </TankContextProvider>
  );
};

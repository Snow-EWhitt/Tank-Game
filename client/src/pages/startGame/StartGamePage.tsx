import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TankContext } from "../../components/Tank/TankContext";

export const StartGamePage = () => {
  const navigate = useNavigate();
  const tankContext = useContext(TankContext);

  const startGame = () => {
    tankContext.resetTanks();

    tankContext.addTank(0);
    tankContext.addTank(1);
    
    navigate("/Local/Game");
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "calc(100vh - 49px)" }}
      >
        <button className="btn btn-success" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

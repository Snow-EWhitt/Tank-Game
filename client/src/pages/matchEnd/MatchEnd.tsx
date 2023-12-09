import { FC } from "react";
import { TankType } from "../../components/Tank/Tank";
import { useNavigate } from "react-router-dom";

export const MatchEnd: FC<{
  winner: TankType;
  handler?: () => void;
}> = ({ winner, handler }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="fs-1 text-center position-absolute top-50 start-50 translate-middle">
        <h1>Game Over</h1>
        <p className="fs-4">Player {winner.id + 1} Wins!</p>
        <div className="d-grid gap-2">
          {handler && (
            <button
              className="btn btn-success"
              onClick={() => {
                if (handler) {
                  handler();
                }
              }}
            >
              Play Again
            </button>
          )}

          <button className="btn btn-danger" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

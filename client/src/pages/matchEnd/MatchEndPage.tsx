import { FC } from "react";
import { TankType } from "../../components/Tank/Tank";

export const MatchEndPage: FC<{
  winner: TankType;
}> = ({ winner }) => {
  return (
    <div className="container">
      <div className="fs-1 text-center position-absolute top-50 start-50 translate-middle">
        <h1>Game Over</h1>
        <p className="fs-4">Player {winner.id + 1} Wins!</p>
      </div>
    </div>
  );
};

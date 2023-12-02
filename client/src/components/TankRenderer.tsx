import { useContext } from "react";
import { TankContext } from "./Tank/TankContext";
import { TankControls } from "./Tank/TankControls";

export const TankRenderer = () => {
  const tankContext = useContext(TankContext);

  const player1Controls = {
    forwardKey: "w",
    backwardKey: "s",
    turnRightKey: "d",
    turnLeftKey: "a",
    turnBarrelRightKey: "e",
    turnBarrelLeftKey: "q",
    fireGunKey: " ",
  };

  const player2Controls = {
    forwardKey: "8",
    backwardKey: "5",
    turnRightKey: "6",
    turnLeftKey: "4",
    turnBarrelRightKey: "9",
    turnBarrelLeftKey: "7",
    fireGunKey: "0",
  };

  return (
    <>
      {tankContext.tanks.map((t) => {
        if (t.id === 0)
          return <TankControls key={t.id} tankId={t.id} tankControls={player1Controls} />;
        else if (t.id === 1)
          return <TankControls key={t.id} tankId={t.id} tankControls={player2Controls} />;
        else
          return <TankControls key={t.id} tankId={t.id} />
      })}
    </>
  );
};

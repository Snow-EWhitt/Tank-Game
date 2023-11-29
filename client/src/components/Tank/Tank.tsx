import { FC } from "react";
import { TankGun } from "./TankGun";

export interface TankType {
  id: number;

  xPosition: number;
  yPosition: number;
  rotation: number;

  movingForward: boolean;
  movingBackward: boolean;
  turningRight: boolean;
  turningLeft: boolean;

  barrelRotation: number;

  turningBarrelRight: boolean;
  turningBarrelLeft: boolean;
}

export const Tank: FC<{ barrelOrientation: number }> = ({
  barrelOrientation,
}) => {
  return (
    <div
      className="bg-success bg-gradient position-relative"
      style={{ height: "75px", width: "50px" }}
    >
      <div
        style={{
          rotate: `${barrelOrientation}deg`,
          position: "absolute",
          bottom: "0",
        }}
      >
        <TankGun />
      </div>
    </div>
  );
};

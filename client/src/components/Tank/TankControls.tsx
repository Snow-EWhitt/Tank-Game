import { FC, useContext, useEffect } from "react";
import { Tank } from "./Tank";
import { TankContext } from "./TankContext";

interface TankControlsType {
  tankId: number;

  tankControls?: {
    forwardKey: string;
    backwardKey: string;
    turnRightKey: string;
    turnLeftKey: string;

    turnBarrelRightKey: string;
    turnBarrelLeftKey: string;

    fireGunKey: string;
  };
}

export const TankControls: FC<TankControlsType> = ({
  tankId,
  tankControls,
}) => {
  const tankContext = useContext(TankContext);
  const tank = tankContext.tanks.find((t) => t.id === tankId);

  // useEffect(() => {
  //   // console.log("Hi");

  //   if (!tank) {
  //     // console.log("Added tank.");
  //     tankContext.addTank(tankId);
  //   }
  // }, [tankContext, tank, tankId]);

  useEffect(() => {
    if (tankControls) {
      const keyDownListener = (event: KeyboardEvent) => {
        if (event.key === tankControls.forwardKey) {
          tankContext.updateTank(tankId, "moveForward");
        }
        if (event.key === tankControls.backwardKey) {
          tankContext.updateTank(tankId, "moveBackward");
        }
        if (event.key === tankControls.turnRightKey) {
          tankContext.updateTank(tankId, "turnRight");
        }
        if (event.key === tankControls.turnLeftKey) {
          tankContext.updateTank(tankId, "turnLeft");
        }
        if (event.key === tankControls.turnBarrelRightKey) {
          tankContext.updateTank(tankId, "turnBarrelRight");
        }
        if (event.key === tankControls.turnBarrelLeftKey) {
          tankContext.updateTank(tankId, "turnBarrelLeft");
        }
        if (event.key === tankControls.fireGunKey) {
          if (!event.repeat) tankContext.updateTank(tankId, "fireGun");
        }
      };

      const keyUpListener = (event: KeyboardEvent) => {
        if (event.key === tankControls.forwardKey) {
          tankContext.updateTank(tankId, "stopForward");
        }
        if (event.key === tankControls.backwardKey) {
          tankContext.updateTank(tankId, "stopBackward");
        }
        if (event.key === tankControls.turnRightKey) {
          tankContext.updateTank(tankId, "stopRight");
        }
        if (event.key === tankControls.turnLeftKey) {
          tankContext.updateTank(tankId, "stopLeft");
        }
        if (event.key === tankControls.turnBarrelRightKey) {
          tankContext.updateTank(tankId, "stopBarrelRight");
        }
        if (event.key === tankControls.turnBarrelLeftKey) {
          tankContext.updateTank(tankId, "stopBarrelLeft");
        }
      };

      window.addEventListener("keydown", keyDownListener);
      window.addEventListener("keyup", keyUpListener);

      return () => {
        window.removeEventListener("keydown", keyDownListener);
        window.removeEventListener("keyup", keyUpListener);
      };
    }
  }, [
    tankContext,
    tankId,
    tankControls?.forwardKey,
    tankControls?.backwardKey,
    tankControls?.turnRightKey,
    tankControls?.turnLeftKey,
    tankControls?.turnBarrelRightKey,
    tankControls?.turnBarrelLeftKey,
    tankControls?.fireGunKey,
    tankControls,
  ]);

  if (!tank) {
    return <p>An error has occured.</p>;
  }

  return (
    <>
      <div
        style={{
          top: `${tank.yPosition}px`,
          left: `${tank.xPosition}px`,
          rotate: `${tank.rotation}deg`,
          position: "absolute",
        }}
      >
        <Tank barrelOrientation={tank.barrelRotation} />
      </div>
    </>
  );
};

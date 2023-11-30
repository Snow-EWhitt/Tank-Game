import { FC, useContext, useEffect } from "react";
import { Tank } from "./Tank";
import { TankContext } from "./TankContext";
import { Projectile } from "./Projectile";

interface TankControlsType {
  forwardKey: string;
  backwardKey: string;
  turnRightKey: string;
  turnLeftKey: string;

  turnBarrelRightKey: string;
  turnBarrelLeftKey: string;

  fireGunKey: string;
}

export const TankControls: FC<TankControlsType> = ({
  forwardKey,
  backwardKey,
  turnRightKey,
  turnLeftKey,
  turnBarrelRightKey,
  turnBarrelLeftKey,
  fireGunKey,
}) => {
  const tankContext = useContext(TankContext);
  const tank = tankContext.tanks.find((t) => t.id === 0);

  useEffect(() => {
    // console.log("Hi");
    
    if (!tank) {
      // console.log("Added tank.");
      tankContext.addTank(0);
    }
  }, [tankContext, tank]);

  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === forwardKey) {
        tankContext.updateTank(0, "moveForward");
      }
      if (event.key === backwardKey) {
        tankContext.updateTank(0, "moveBackward");
      }
      if (event.key === turnRightKey) {
        tankContext.updateTank(0, "turnRight");
      }
      if (event.key === turnLeftKey) {
        tankContext.updateTank(0, "turnLeft");
      }
      if (event.key === turnBarrelRightKey) {
        tankContext.updateTank(0, "turnBarrelRight");
      }
      if (event.key === turnBarrelLeftKey) {
        tankContext.updateTank(0, "turnBarrelLeft");
      }
      if (event.key === fireGunKey) {
        if (!event.repeat)
          tankContext.updateTank(0, "fireGun");
      }
    };

    const keyUpListener = (event: KeyboardEvent) => {
      if (event.key === forwardKey) {
        tankContext.updateTank(0, "stopForward");
      }
      if (event.key === backwardKey) {
        tankContext.updateTank(0, "stopBackward");
      }
      if (event.key === turnRightKey) {
        tankContext.updateTank(0, "stopRight");
      }
      if (event.key === turnLeftKey) {
        tankContext.updateTank(0, "stopLeft");
      }
      if (event.key === turnBarrelRightKey) {
        tankContext.updateTank(0, "stopBarrelRight");
      }
      if (event.key === turnBarrelLeftKey) {
        tankContext.updateTank(0, "stopBarrelLeft");
      }
    };

    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);

    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }, [
    tankContext,
    forwardKey,
    backwardKey,
    turnRightKey,
    turnLeftKey,
    turnBarrelRightKey,
    turnBarrelLeftKey,
    fireGunKey,
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
      {tankContext.projectiles.map((p) => (
        <div
          // key={p.id}
          style={{
            top: `${p.yPosition}px`,
            left: `${p.xPosition}px`,
            rotate: `${p.rotation}deg`,
            position: "absolute",
          }}
        >
          <Projectile />
        </div>
      ))}
    </>
  );
};

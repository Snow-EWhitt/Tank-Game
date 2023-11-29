import { FC, useContext, useEffect, useState } from "react";
import { Tank } from "./Tank";
import { TankContext } from "./TankContext";

interface TankControlsType {
  forwardKey: string;
  backwardKey: string;
  turnRightKey: string;
  turnLeftKey: string;

  turnBarrelRightKey: string;
  turnBarrelLeftKey: string;
}

const speedConstant = 1;
const rotationConstant = 0.5;

export const TankControls: FC<TankControlsType> = ({
  forwardKey,
  backwardKey,
  turnRightKey,
  turnLeftKey,
  turnBarrelRightKey,
  turnBarrelLeftKey,
}) => {
  const [position, setPosition] = useState({ X: 0, Y: 0 });
  const [orientation, setOrientation] = useState(0);
  const [movingForward, setMovingForward] = useState(false);
  const [movingBackward, setMovingBackward] = useState(false);
  const [turningRight, setTurningRight] = useState(false);
  const [turningLeft, setTurningLeft] = useState(false);

  const [turningBarrelRight, setTurningBarrelRight] = useState(false);
  const [turningBarrelLeft, setTurningBarrelLeft] = useState(false);
  const [barrelOrientation, setBarrelOrientation] = useState(0);

  const tankContext = useContext(TankContext);
  const tank = tankContext.tanks[0];

  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === forwardKey) setMovingForward(true);
      if (event.key === backwardKey) setMovingBackward(true);
      if (event.key === turnRightKey) setTurningRight(true);
      if (event.key === turnLeftKey) setTurningLeft(true);

      if (event.key === turnBarrelRightKey) setTurningBarrelRight(true);
      if (event.key === turnBarrelLeftKey) setTurningBarrelLeft(true);
    };
    const keyUpListener = (event: KeyboardEvent) => {
      if (event.key === forwardKey) setMovingForward(false);
      if (event.key === backwardKey) setMovingBackward(false);
      if (event.key === turnRightKey) setTurningRight(false);
      if (event.key === turnLeftKey) setTurningLeft(false);

      if (event.key === turnBarrelRightKey) setTurningBarrelRight(false);
      if (event.key === turnBarrelLeftKey) setTurningBarrelLeft(false);
    };
    const updateTank = () => {
      if (movingForward)
        setPosition((oldPosition) => ({
          X:
            oldPosition.X +
            speedConstant * Math.sin((orientation * Math.PI) / 180),
          Y:
            oldPosition.Y -
            speedConstant * Math.cos((orientation * Math.PI) / 180),
        }));
      if (movingBackward)
        setPosition((oldPosition) => ({
          X:
            oldPosition.X -
            speedConstant * Math.sin((orientation * Math.PI) / 180),
          Y:
            oldPosition.Y +
            speedConstant * Math.cos((orientation * Math.PI) / 180),
        }));
      if (turningRight)
        setOrientation((oldOrientation) => oldOrientation + rotationConstant);
      if (turningLeft)
        setOrientation((oldOrientation) => oldOrientation - rotationConstant);

      if (turningBarrelRight)
        setBarrelOrientation(
          (oldOrientation) => oldOrientation + rotationConstant
        );
      if (turningBarrelLeft)
        setBarrelOrientation(
          (oldBarrelOrientation) => oldBarrelOrientation - rotationConstant
        );
    };

    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);
    const timerId = window.setInterval(updateTank, 10);

    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
      window.clearInterval(timerId);
    };
  }, [
    forwardKey,
    backwardKey,
    turnRightKey,
    turnLeftKey,
    movingForward,
    movingBackward,
    turningRight,
    turningLeft,
    orientation,
    turnBarrelRightKey,
    turnBarrelLeftKey,
    turningBarrelRight,
    turningBarrelLeft,
  ]);

  return (
    <div
      style={{
        top: position.Y,
        left: position.X,
        rotate: `${orientation}deg`,
        position: "absolute",
      }}
    >
      <Tank barrelOrientation={barrelOrientation} />
    </div>
  );
};

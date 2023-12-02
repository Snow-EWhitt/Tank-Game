import Constants from "../../Constants";
import { TankType } from "./Tank";

export const moveTank = (tank: TankType) => {
  const potentialNextPosition = tank.movingForward
    ? tankMovedForward(tank)
    : tank.movingBackward
    ? tankMovedBackward(tank)
    : tank;

  const nextPosition = tankIsInBounds(potentialNextPosition)
    ? potentialNextPosition
    : tank;

  const rotationAdjustedTank = nextPosition.turningLeft
    ? tankTurnedLeft(nextPosition)
    : nextPosition.turningRight
    ? tankTurnedRight(nextPosition)
    : nextPosition;

  const barrelAdjustedTank = rotationAdjustedTank.turningBarrelLeft
    ? barrelTurnedLeft(rotationAdjustedTank)
    : rotationAdjustedTank.turningBarrelRight
    ? barrelTurnedRight(rotationAdjustedTank)
    : rotationAdjustedTank;

  return barrelAdjustedTank;
};

const tankIsInBounds = (t: TankType) =>
  t.xPosition >= 0 &&
  t.xPosition <= Constants.boundaryWidth - Constants.tankWidth &&
  t.yPosition >= 0 &&
  t.yPosition <= Constants.boundaryHeight - Constants.tankHeight;

const tankMovedForward = (t: TankType) => ({
  ...t,
  xPosition:
    t.xPosition + Constants.tankSpeedConstant * Math.sin((t.rotation * Math.PI) / 180),
  yPosition:
    t.yPosition - Constants.tankSpeedConstant * Math.cos((t.rotation * Math.PI) / 180),
});

const tankMovedBackward = (t: TankType) => ({
  ...t,
  xPosition:
    t.xPosition - Constants.tankSpeedConstant * Math.sin((t.rotation * Math.PI) / 180),
  yPosition:
    t.yPosition + Constants.tankSpeedConstant * Math.cos((t.rotation * Math.PI) / 180),
});

const tankTurnedLeft = (t: TankType) => ({
  ...t,
  rotation: t.rotation - Constants.barrelRotationRate,
});

const tankTurnedRight = (t: TankType) => ({
  ...t,
  rotation: t.rotation + Constants.barrelRotationRate,
});

const barrelTurnedLeft = (t: TankType) => ({
  ...t,
  barrelRotation: t.barrelRotation - Constants.barrelRotationRate,
});

const barrelTurnedRight = (t: TankType) => ({
  ...t,
  barrelRotation: t.barrelRotation + Constants.barrelRotationRate,
});

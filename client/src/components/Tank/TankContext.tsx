import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { TankType } from "./Tank";

const speedConstant = 1;
const rotationConstant = 0.5;

export interface TankContextType {
  tanks: TankType[];
  addTank: (id: number) => void;
  updateTank: (id: number, action: string) => void;
}

export const TankContext = createContext<TankContextType>({
  tanks: [],
  addTank: () => {},
  updateTank: () => {},
});

const TankContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tanks, _setTanks] = useState<TankType[]>([]);

  useEffect(() => {
    const moveTanks = () => {
      _setTanks((oldTanks) => oldTanks.map((t) => moveTank(t)));
    };

    const moveTank = (tank: TankType) => {
      const nextPosition = tank.movingForward
        ? tankMovedForward(tank)
        : tank.movingBackward
        ? tankMovedBackward(tank)
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

    const intervalId = window.setInterval(moveTanks, 10);

    return () => window.clearInterval(intervalId);
  }, []);

  const tankMovedForward = (t: TankType) => ({
    ...t,
    xPosition:
      t.xPosition + speedConstant * Math.sin((t.rotation * Math.PI) / 180),
    yPosition:
      t.yPosition - speedConstant * Math.cos((t.rotation * Math.PI) / 180),
  });

  const tankMovedBackward = (t: TankType) => ({
    ...t,
    xPosition:
      t.xPosition - speedConstant * Math.sin((t.rotation * Math.PI) / 180),
    yPosition:
      t.yPosition + speedConstant * Math.cos((t.rotation * Math.PI) / 180),
  });

  const tankTurnedLeft = (t: TankType) => ({
    ...t,
    rotation: t.rotation - rotationConstant,
  });

  const tankTurnedRight = (t: TankType) => ({
    ...t,
    rotation: t.rotation + rotationConstant,
  });

  const barrelTurnedLeft = (t: TankType) => ({
    ...t,
    barrelRotation: t.barrelRotation - rotationConstant,
  });

  const barrelTurnedRight = (t: TankType) => ({
    ...t,
    barrelRotation: t.barrelRotation + rotationConstant,
  });

  const addTank = (id: number) => {
    const newTank: TankType = {
      id,

      xPosition: 0,
      yPosition: 0,
      rotation: 0,

      movingForward: false,
      movingBackward: false,
      turningRight: false,
      turningLeft: false,

      barrelRotation: 0,

      turningBarrelRight: false,
      turningBarrelLeft: false,
    };

    _setTanks((oldTanks) => [...oldTanks, newTank]);
  };

  const updateTank = (id: number, tankAction: string) => {
    _setTanks((oldTanks) =>
      oldTanks.map((t) => {
        if (t.id === id) {
          if (tankAction === "moveForward") {
            return { ...t, movingForward: true };
          }
          if (tankAction === "moveBackward") {
            return { ...t, movingBackward: true };
          }
          if (tankAction === "turnRight") {
            return { ...t, turningRight: true };
          }
          if (tankAction === "turnLeft") {
            return { ...t, turningLeft: true };
          }
          if (tankAction === "stopForward") {
            return { ...t, movingForward: false };
          }
          if (tankAction === "stopBackward") {
            return { ...t, movingBackward: false };
          }
          if (tankAction === "stopRight") {
            return { ...t, turningRight: false };
          }
          if (tankAction === "stopLeft") {
            return { ...t, turningLeft: false };
          }
          if (tankAction === "turnBarrelRight") {
            return { ...t, turningBarrelRight: true };
          }
          if (tankAction === "turnBarrelLeft") {
            return { ...t, turningBarrelLeft: true };
          }
          if (tankAction === "stopBarrelRight") {
            return { ...t, turningBarrelRight: false };
          }
          if (tankAction === "stopBarrelLeft") {
            return { ...t, turningBarrelLeft: false };
          }
        }

        return t;
      })
    );
  };

  const startingValue: TankContextType = {
    tanks,
    addTank,
    updateTank,
  };

  return (
    <TankContext.Provider value={startingValue}>
      {children}
    </TankContext.Provider>
  );
};

export default TankContextProvider;

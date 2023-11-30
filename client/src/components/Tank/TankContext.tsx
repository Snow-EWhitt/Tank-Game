import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { TankType } from "./Tank";
import { ProjectileType } from "./Projectile";

const speedConstant = 1;
const rotationConstant = 0.5;

export interface TankContextType {
  tanks: TankType[];
  addTank: (id: number) => void;
  updateTank: (id: number, action: string) => void;
  projectiles: ProjectileType[];
}

export const TankContext = createContext<TankContextType>({
  tanks: [],
  addTank: () => {},
  updateTank: () => {},
  projectiles: [],
});

const TankContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tanks, setTanks] = useState<TankType[]>([]);
  const [projectiles, setProjectiles] = useState<ProjectileType[]>([]);

  useEffect(() => {
    const moveTanks = () => {
      setTanks((oldTanks) => oldTanks.map((t) => moveTank(t)));
    };

    const moveTank = (tank: TankType) => {
      const potentialNextPosition = tank.movingForward
        ? tankMovedForward(tank)
        : tank.movingBackward
        ? tankMovedBackward(tank)
        : tank;

      const inBoundsNextMove =
        potentialNextPosition.xPosition > 0 &&
        potentialNextPosition.xPosition < 1000 - 50 &&
        potentialNextPosition.yPosition > 0 &&
        potentialNextPosition.yPosition < 500 - 75;

      const nextPosition = inBoundsNextMove ? potentialNextPosition : tank;

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

    const moveProjectiles = () => {
      setProjectiles((oldProjectiles) => {
        const newPositions = oldProjectiles.map((p) => moveProjectile(p));

        return newPositions.filter(
          (p) =>
            p.xPosition > 0 &&
            p.xPosition < 1000 &&
            p.yPosition > 0 &&
            p.yPosition < 500
        );
      });
    };

    const moveProjectile = (p: ProjectileType) => ({
      ...p,
      xPosition:
        p.xPosition + speedConstant * Math.sin((p.rotation * Math.PI) / 180),
      yPosition:
        p.yPosition - speedConstant * Math.cos((p.rotation * Math.PI) / 180),
    });

    const intervalId = window.setInterval(() => {
      moveTanks();
      moveProjectiles();
    }, 10);

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

    setTanks((oldTanks) => [...oldTanks, newTank]);
  };

  const addProjectile = (tank: TankType) => {
    const newProjectile: ProjectileType = {
      id: projectiles.length,
      tankId: tank.id,
      xPosition: tank.xPosition + 25,
      yPosition: tank.yPosition + 37,
      rotation: tank.rotation + tank.barrelRotation,
    };

    setProjectiles((oldProjectiles) => [...oldProjectiles, newProjectile]);
  };

  const updateTank = (id: number, tankAction: string) => {
    setTanks((oldTanks) =>
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
          if (tankAction === "fireGun") {
            addProjectile(t);
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
    projectiles,
  };

  return (
    <TankContext.Provider value={startingValue}>
      {children}
    </TankContext.Provider>
  );
};

export default TankContextProvider;

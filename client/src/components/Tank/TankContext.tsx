import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { TankType } from "./Tank";
import { ProjectileType } from "./Projectile";
import { moveTank } from "./TankLogic";
import { moveProjectile, projectileIsInBounds } from "../ProjectileLogic";
import { TankContextType } from "../../contextTypes";
import Constants from "../../constants";

export const TankContext = createContext<TankContextType>({
  tanks: [],
  addTank: () => {},
  updateTank: () => {},
  projectiles: [],
  resetTanks: () => {},
});

const TankContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tanks, setTanks] = useState<TankType[]>([]);
  const [projectiles, setProjectiles] = useState<ProjectileType[]>([]);

  useEffect(() => {
    const moveTanks = () => {
      setTanks((oldTanks) => oldTanks.map((t) => moveTank(t)));
    };

    const moveProjectiles = () => {
      setProjectiles((oldProjectiles) => {
        const newPositions = oldProjectiles.map((p) => moveProjectile(p));

        return newPositions.filter((p) => projectileIsInBounds(p));
      });
    };

    const intervalId = window.setInterval(() => {
      moveTanks();
      moveProjectiles();
    }, Constants.refreshRate);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    projectiles.forEach((p) => {
      tanks.forEach((t) => {
        if (p.tankId !== t.id) {
          const centeredProjectile = {
            X: p.xPosition + Constants.projectileWidth,
            Y: p.yPosition + Constants.projectileHeight,
          };

          const centeredTank = {
            X: t.xPosition + Constants.tankWidth / 2,
            Y: t.yPosition + Constants.tankHeight / 2,
          };

          const deltaX = Math.abs(centeredProjectile.X - centeredTank.X);
          const deltaY = Math.abs(centeredProjectile.Y - centeredTank.Y);

          if (deltaX + deltaY < Constants.tankProximity) {
            setTanks((oldTanks) => oldTanks.filter((tank) => tank.id !== t.id));
            setProjectiles((oldProjectiles) =>
              oldProjectiles.filter((projectile) => projectile.id !== p.id)
            );
          }
        }
      });
    });
  }, [tanks, projectiles]);

  const resetTanks = () => {
    setTanks([]);
  };

  const addTank = (id: number) => {
    const newTank: TankType = {
      id,

      xPosition: 100,
      yPosition: 100,
      rotation: 0,

      movingForward: false,
      movingBackward: false,
      turningRight: false,
      turningLeft: false,

      barrelRotation: 0,

      turningBarrelRight: false,
      turningBarrelLeft: false,
    };

    setTanks((oldTanks) => {
      if (!oldTanks.find((t) => t.id === newTank.id))
        return [...oldTanks, newTank];

      return oldTanks;
    });
  };

  const addProjectile = (tank: TankType) => {
    setProjectiles((oldProjectiles) => {
      const oldProjectileIds = oldProjectiles.map((p) => p.id);
      const largestId = oldProjectileIds.length
        ? Math.max(...oldProjectileIds)
        : 0;

      const newProjectile: ProjectileType = {
        id: largestId + 1,
        tankId: tank.id,
        xPosition: tank.xPosition + 25,
        yPosition: tank.yPosition + 37,
        rotation: tank.rotation + tank.barrelRotation,
      };

      if (!oldProjectiles.find((p) => p.id === newProjectile.id))
        return [...oldProjectiles, newProjectile];

      return oldProjectiles;
    });
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
    resetTanks,
  };

  return (
    <TankContext.Provider value={startingValue}>
      {children}
    </TankContext.Provider>
  );
};

export default TankContextProvider;

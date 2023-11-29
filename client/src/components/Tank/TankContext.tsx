import { FC, ReactNode, createContext, useState } from "react";
import { TankType } from "./Tank";

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
            return { ...t, movingBackward: true};
          }
          if (tankAction === "turnRight") {
            return { ...t, turningRight: true};
          }
          if (tankAction === "turnLeft") {
            return { ...t, turningLeft: true};
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

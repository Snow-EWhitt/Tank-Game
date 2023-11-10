import { FC, ReactNode, createContext, useState } from "react";
import { TankType } from "./Tank";

export interface TankContextType {
  tanks: TankType[];
}

export const TankContext = createContext<TankContextType>({
  tanks: [],
});

const TankContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tanks, setTanks] = useState([]);
  
  const startingValue: TankContextType = {
    tanks,
  };
  
  return (
    <TankContext.Provider value={startingValue}>
      {children}
    </TankContext.Provider>
  );
};

export default TankContextProvider;

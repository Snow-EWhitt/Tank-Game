import { FC, ReactNode } from "react";

export interface TankType {
  id: number;

  xPosition: number;
  yPosition: number;
  rotation: number;
}

export const Tank: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className="bg-success bg-gradient position-relative"
      style={{ height: "75px", width: "50px" }}
    >
      {children}
    </div>
  );
};

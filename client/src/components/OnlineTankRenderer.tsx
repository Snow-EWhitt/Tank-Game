import { Context, FC, useContext } from "react";
import { TankControls } from "./Tank/TankControls";
import { TankContextType } from "../contextTypes";

export const OnlineTankRenderer: FC<{
  context: Context<TankContextType>;
  tankId: number;
}> = ({ context, tankId }) => {
  const tankContext = useContext(context);

  const controls = {
    forwardKey: "w",
    backwardKey: "s",
    turnRightKey: "d",
    turnLeftKey: "a",
    turnBarrelRightKey: "e",
    turnBarrelLeftKey: "q",
    fireGunKey: " ",
  };

  return (
    <>
      {tankContext.tanks.map((t) => {
        if (t.id === tankId) {
          return (
            <TankControls
              key={t.id}
              tankId={t.id}
              tankControls={controls}
              context={context}
            />
          );
        } else {
          return <TankControls key={t.id} tankId={t.id} context={context} />;
        }
      })}
    </>
  );
};

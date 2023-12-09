import { Context, FC, useContext } from "react";
import { Projectile } from "./Tank/Projectile";
import { TankContextType } from "../contextTypes";

export const OnlineProjectileRenderer: FC<{
  context: Context<TankContextType>;
}> = ({ context }) => {
  const projectileContext = useContext(context);

  return (
    <>
      {projectileContext.projectiles.map((p) => (
        <div
          key={p.id}
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

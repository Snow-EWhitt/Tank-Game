import Constants from "../Constants";
import { ProjectileType } from "./Tank/Projectile";

export const moveProjectile = (p: ProjectileType) => {
  return {
    ...p,
    xPosition:
      p.xPosition +
      Constants.projectileSpeedConstant *
        Math.sin((p.rotation * Math.PI) / 180),
    yPosition:
      p.yPosition -
      Constants.projectileSpeedConstant *
        Math.cos((p.rotation * Math.PI) / 180),
  };
};

export const projectileIsInBounds = (p: ProjectileType) =>
  p.xPosition > 0 &&
  p.xPosition < Constants.boundaryWidth &&
  p.yPosition > 0 &&
  p.yPosition < Constants.boundaryHeight;

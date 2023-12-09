import Constants from "../../constants";

export interface ProjectileType {
  id: number;
  tankId: number;

  xPosition: number;
  yPosition: number;
  rotation: number;
}

export const Projectile = () => {
  return (
    <div
      className="bg-warning bg-gradient border position-absolute"
      style={{ width: `${Constants.projectileWidth}px`, height: `${Constants.projectileHeight}px` }}
    />
  );
};

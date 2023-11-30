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
      style={{ height: "16px", width: "8px" }}
    />
  );
};

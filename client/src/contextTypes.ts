import { TankType } from "./components/Tank/Tank";
import { ProjectileType } from "./components/Tank/Projectile";

export interface TankContextType {
  tanks: TankType[];
  addTank: (id: number) => void;
  updateTank: (id: number, action: string) => void;
  projectiles: ProjectileType[];
  resetTanks: () => void;
}

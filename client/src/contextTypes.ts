import { TankType } from "./components/Tank/Tank";
import { ProjectileType } from "./components/Tank/Projectile";
import { GameState } from "./pages/constants";

export interface TankContextType {
  tanks: TankType[];
  updateState: (state: GameState) => void;
  addTank: (id: number) => void;
  updateTank: (id: number, action: string) => void;
  projectiles: ProjectileType[];
  resetTanks: () => void;
  state: GameState;
}

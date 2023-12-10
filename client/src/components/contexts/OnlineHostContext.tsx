import { TankType } from "../Tank/Tank";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TankContextType } from "../../contextTypes";
import * as signalR from "@microsoft/signalr";
import { moveTank } from "../Tank/TankLogic";
import { ProjectileType } from "../Tank/Projectile";
import { moveProjectile, projectileIsInBounds } from "../ProjectileLogic";
import Constants, { GameState, MessageTypes } from "../../pages/constants";
import toast from "react-hot-toast";

export interface GeneralMessage {
  type: MessageTypes;
  gameState: GameState;
  notification?: string;
}

export interface UpdateVehicleMessage {
  type: MessageTypes;
  id: number;
  vehicleAction: string;
}

export interface AddVehicleMessage {
  type: MessageTypes;
  id: number;
}

export interface VehicleStateMessage {
  type: MessageTypes;
  vehicles: TankType[];
  projectiles: ProjectileType[];
}

export const OnlineHostContext = createContext<TankContextType>({
  state: GameState.Joining,
  updateState: () => {},
  tanks: [],
  addTank: () => {},
  updateTank: () => {},
  projectiles: [],
  resetTanks: () => {},
});

const OnlineHostContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>(GameState.Joining);
  const [tanks, setTanks] = useState<TankType[]>([]);
  const [projectiles, setProjectiles] = useState<ProjectileType[]>([]);
  const connection = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const moveTanks = () => {
      setTanks((oldTanks) => oldTanks.map((t) => moveTank(t)));
    };

    const moveProjectiles = () => {
      setProjectiles((oldProjectiles) => {
        const newPositions = oldProjectiles.map((p) => moveProjectile(p));

        return newPositions.filter((p) => projectileIsInBounds(p));
      });
    };

    if (state === GameState.Playing) {
      if (tanks.length <= 1) setState(GameState.Ended);

      const intervalId = window.setInterval(() => {
        moveTanks();
        moveProjectiles();
      }, Constants.refreshRate);

      return () => window.clearInterval(intervalId);
    }
  }, [state, tanks.length]);

  useEffect(() => {
    const message: GeneralMessage = {
      type: MessageTypes.General,
      gameState: state,
      notification: `State: ${state.toString()}`,
    };

    sendMessage(JSON.stringify(message));
  }, [state]);

  useEffect(() => {
    projectiles.forEach((p) => {
      tanks.forEach((t) => {
        if (p.tankId !== t.id) {
          const centeredProjectile = {
            X: p.xPosition + Constants.projectileWidth,
            Y: p.yPosition + Constants.projectileHeight,
          };

          const centeredTank = {
            X: t.xPosition + Constants.tankWidth / 2,
            Y: t.yPosition + Constants.tankHeight / 2,
          };

          const deltaX = Math.abs(centeredProjectile.X - centeredTank.X);
          const deltaY = Math.abs(centeredProjectile.Y - centeredTank.Y);

          if (deltaX + deltaY < Constants.tankProximity) {
            setTanks((oldTanks) => oldTanks.filter((tank) => tank.id !== t.id));
            setProjectiles((oldProjectiles) =>
              oldProjectiles.filter((projectile) => projectile.id !== p.id)
            );
          }
        }
      });
    });
  }, [tanks, projectiles]);

  useEffect(() => {
    const message: VehicleStateMessage = {
      type: MessageTypes.VehicleState,
      vehicles: tanks,
      projectiles,
    };

    sendMessage(JSON.stringify(message));
  }, [tanks, projectiles]);

  useEffect(() => {
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("https://tankbattles.duckdns.org:10007/api/ws")
      .build();

    // connection.current = new signalR.HubConnectionBuilder()
    //   .withUrl("http://localhost:5186/api/ws")
    //   .build();

    connection.current
      .start()
      .then(() => {
        console.log("Connected to server...");
        addTank(0);
      })
      .catch((err) => console.error(err));

    connection.current.on("messageReceived", (json) => {
      const message = JSON.parse(json) as GeneralMessage;

      if (message.type === MessageTypes.General) {
        if (message.notification) toast(message.notification);
      }

      if (message.type === MessageTypes.AddVehicle) {
        const addMessage = JSON.parse(json) as AddVehicleMessage;

        console.log("Adding tank...");
        addTank(addMessage.id);
      }

      if (message.type === MessageTypes.UpdateVehicle) {
        const updateMessage = JSON.parse(json) as UpdateVehicleMessage;

        console.log(updateMessage);

        updateTank(updateMessage.id, updateMessage.vehicleAction);
      }
    });

    return () => {
      connection.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message: string) => {
    if (connection.current?.state === signalR.HubConnectionState.Connected)
      connection.current.invoke("NewMessage", message);
  };

  const updateState = (state: GameState) => {
    setState(state);
  };

  const addProjectile = (tank: TankType) => {
    setProjectiles((oldProjectiles) => {
      const oldProjectileIds = oldProjectiles.map((p) => p.id);
      const largestId = oldProjectileIds.length
        ? Math.max(...oldProjectileIds)
        : 0;

      const newProjectile: ProjectileType = {
        id: largestId + 1,
        tankId: tank.id,
        xPosition: tank.xPosition + 25,
        yPosition: tank.yPosition + 37,
        rotation: tank.rotation + tank.barrelRotation,
      };

      if (!oldProjectiles.find((p) => p.id === newProjectile.id))
        return [...oldProjectiles, newProjectile];

      return oldProjectiles;
    });
  };

  const resetTanks = () => {
    setTanks([]);
  };

  const addTank = (id: number) => {
    const newTank: TankType = {
      id,

      xPosition: 100,
      yPosition: 100,
      rotation: 0,

      movingForward: false,
      movingBackward: false,
      turningRight: false,
      turningLeft: false,

      barrelRotation: 0,

      turningBarrelRight: false,
      turningBarrelLeft: false,
    };

    setTanks((oldTanks) => {
      if (!oldTanks.find((t) => t.id === newTank.id))
        return [...oldTanks, newTank];

      return oldTanks;
    });
  };

  const updateTank = (id: number, tankAction: string) => {
    setTanks((oldTanks) =>
      oldTanks.map((t) => {
        if (t.id === id) {
          if (tankAction === "moveForward") {
            return { ...t, movingForward: true };
          }
          if (tankAction === "moveBackward") {
            return { ...t, movingBackward: true };
          }
          if (tankAction === "turnRight") {
            return { ...t, turningRight: true };
          }
          if (tankAction === "turnLeft") {
            return { ...t, turningLeft: true };
          }
          if (tankAction === "stopForward") {
            return { ...t, movingForward: false };
          }
          if (tankAction === "stopBackward") {
            return { ...t, movingBackward: false };
          }
          if (tankAction === "stopRight") {
            return { ...t, turningRight: false };
          }
          if (tankAction === "stopLeft") {
            return { ...t, turningLeft: false };
          }
          if (tankAction === "turnBarrelRight") {
            return { ...t, turningBarrelRight: true };
          }
          if (tankAction === "turnBarrelLeft") {
            return { ...t, turningBarrelLeft: true };
          }
          if (tankAction === "stopBarrelRight") {
            return { ...t, turningBarrelRight: false };
          }
          if (tankAction === "stopBarrelLeft") {
            return { ...t, turningBarrelLeft: false };
          }
          if (tankAction === "fireGun") {
            addProjectile(t);
          }
        }

        return t;
      })
    );
  };

  const startingValue: TankContextType = {
    state,
    updateState,
    tanks,
    addTank,
    updateTank,
    projectiles,
    resetTanks,
  };

  return (
    <OnlineHostContext.Provider value={startingValue}>
      {children}
    </OnlineHostContext.Provider>
  );
};

export default OnlineHostContextProvider;

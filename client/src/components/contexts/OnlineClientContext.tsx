import { TankType } from "../Tank/Tank";
import { TankContextType } from "../../contextTypes";
import {
  AddVehicleMessage,
  GeneralMessage,
  UpdateVehicleMessage,
  VehicleStateMessage,
} from "./OnlineHostContext";
import { GameState, MessageTypes } from "../../pages/constants";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
// import Connector from "../../signalr-connection";
import * as signalR from "@microsoft/signalr";
import { ProjectileType } from "../Tank/Projectile";
import toast from "react-hot-toast";

export const OnlineClientContext = createContext<TankContextType>({
  state: GameState.Joining,
  updateState: () => {},
  tanks: [],
  addTank: () => {},
  updateTank: () => {},
  projectiles: [],
  resetTanks: () => {},
});

const OnlineClientContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>(GameState.Joining);
  const [tanks, setTanks] = useState<TankType[]>([]);
  const [projectiles, setProjectiles] = useState<ProjectileType[]>([]);
  const connection = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    // connection.current = new signalR.HubConnectionBuilder()
    //   .withUrl("https://tankbattles.duckdns.org:10007/api/ws")
    //   .build();

    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5186/api/ws")
      .build();

    connection.current
      .start()
      .then(() => {
        const message: GeneralMessage = {
          type: MessageTypes.General,
          gameState: GameState.Joining,
          notification: "Client connected",
        };

        addTank(1);
        connection.current?.invoke("NewMessage", JSON.stringify(message));
      })
      .catch((err) => console.log(err));

    connection.current.on("messageReceived", (json: string) => {
      const message = JSON.parse(json) as GeneralMessage;

      if (message.type === MessageTypes.General) {
        setState(message.gameState);

        if (message.notification) toast(message.notification);
      }

      if (message.type === MessageTypes.VehicleState) {
        const stateMessage = JSON.parse(json) as VehicleStateMessage;

        setTanks(stateMessage.vehicles);
        setProjectiles(stateMessage.projectiles);
      }
    });

    return () => {
      if (connection.current) connection.current.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message: string) => {
    if (connection.current?.state === signalR.HubConnectionState.Connected)
      connection.current.invoke("NewMessage", message);
  };

  const resetTanks = () => {};
  const updateState = () => {};

  const addTank = (id: number) => {
    const message: AddVehicleMessage = {
      type: MessageTypes.AddVehicle,
      id,
    };

    sendMessage(JSON.stringify(message));
  };

  const updateTank = (id: number, tankAction: string) => {
    const message: UpdateVehicleMessage = {
      type: MessageTypes.UpdateVehicle,
      id,
      vehicleAction: tankAction,
    };

    sendMessage(JSON.stringify(message));
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
    <OnlineClientContext.Provider value={startingValue}>
      {children}
    </OnlineClientContext.Provider>
  );
};

export default OnlineClientContextProvider;

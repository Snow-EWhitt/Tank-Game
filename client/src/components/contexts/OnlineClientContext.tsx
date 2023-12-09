import { TankType } from "../Tank/Tank";
import { TankContextType } from "../../contextTypes";
import {
  AddVehicleMessage,
  GeneralMessage,
  UpdateVehicleMessage,
  VehicleStateMessage,
} from "./OnlineHostContext";
import { MessageTypes } from "../../constants";
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

export const OnlineClientContext = createContext<TankContextType>({
  tanks: [],
  addTank: () => {},
  updateTank: () => {},
  projectiles: [],
  resetTanks: () => {},
});

const OnlineClientContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tanks, setTanks] = useState<TankType[]>([]);
  const [projectiles, setProjectiles] = useState<ProjectileType[]>([]);
  const connection = useRef<signalR.HubConnection | null>(null);

  // const { events } = Connector();

  useEffect(() => {
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("https://tankbattles.duckdns.org:10007/ws")
      .build();

    connection.current
      .start()
      .then(() => {
        console.log("Connected to server...");
        addTank(1);
        connection.current?.invoke("NewMessage", "Client connected...");
      })
      .catch((err) => console.log(err));

    connection.current.on("messageReceived", (json: string) => {
      const message = JSON.parse(json) as GeneralMessage;

      if (message.type === MessageTypes.VehicleState) {
        const stateMessage = JSON.parse(json) as VehicleStateMessage;

        setTanks(stateMessage.vehicles);
        setProjectiles(stateMessage.projectiles);
      } else {
        console.log(json);
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

  const resetTanks = () => {

  }

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

import * as signalR from "@microsoft/signalr";

const serverUrl = process.env.HUB_ADDRESS ?? "http://localhost:5186/ws";

class Connector {
  private connection: signalR.HubConnection;
  public events: (onMessageReceived: (message: string) => void) => void;
  static instance: Connector;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(serverUrl, {
        // skipNegotiation: true,
        // transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => document.write(err));
    this.events = (onMessageReceived) => {
      this.connection.on("messageReceived", (message) => {
        onMessageReceived(message);
      });
    };
  }

  public newMessage = (message: string) => {
    this.connection
      .send("newMessage", message)
      .then((_) => console.log("sent"));
  };

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();

    return Connector.instance;
  }
}

export default Connector.getInstance;

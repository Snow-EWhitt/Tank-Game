using Microsoft.AspNetCore.SignalR;

namespace api.Hubs;

public class WebSocketHub : Hub
{
  public async Task NewMessage(string message)
  {
    await Clients.All.SendAsync("messageReceived", message);
  }
}
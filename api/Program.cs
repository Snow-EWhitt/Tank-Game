using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseWebSockets();

app.Map("/ws/repeater", async (context) =>
{
  if (context.WebSockets.IsWebSocketRequest)
  {
    var webSocketManager = app.Services.GetRequiredService<WebSocketManager>();
    WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
    string connId = webSocketManager.AddSocket(webSocket);
    await webSocketManager.EchoMessagesAsync(webSocket, CancellationToken.None);
  }
  else
  {
    context.Response.StatusCode = StatusCodes.Status400BadRequest;
    await context.Response.WriteAsync("Not a websocket request");
  }
});

app.Run();

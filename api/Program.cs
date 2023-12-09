using api.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddScoped<WebSocketManager>();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
  app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials()); // allow credentials
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<WebSocketHub>("/api/ws");

// app.MapGet("/", () => "Hello, World!");

// var webSocketOptions = new WebSocketOptions
// {
//   KeepAliveInterval = TimeSpan.FromMinutes(2)
// };

// app.UseWebSockets(webSocketOptions);

// app.Use(async (context, next) =>
// {
//   if (context.Request.Path == "/ws")
//   {
//     if (context.WebSockets.IsWebSocketRequest)
//     {
//       Console.WriteLine("Received a websocket");

//       using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
//       await Echo(webSocket);
//     }
//     else
//     {
//       context.Response.StatusCode = StatusCodes.Status400BadRequest;
//     }
//   }
//   else
//   {
//     await next(context);
//   }
// });

app.Run();

// static async Task Echo(WebSocket webSocket)
// {
//   var buffer = new byte[1024 * 4];
//   var receiveResult = await webSocket.ReceiveAsync(
//     new ArraySegment<byte>(buffer), CancellationToken.None
//   );

//     WebSocketManager.webSockets.Add(webSocket);
//     Console.WriteLine(WebSocketManager.webSockets.Count);

//     while (!receiveResult.CloseStatus.HasValue)
//     {
//       foreach (var socket in WebSocketManager.webSockets)
//       {
//         await webSocket.SendAsync(
//           new ArraySegment<byte>(buffer, 0, receiveResult.Count),
//           receiveResult.MessageType,
//           receiveResult.EndOfMessage,
//           CancellationToken.None
//         );
//       }

//       receiveResult = await webSocket.ReceiveAsync(
//         new ArraySegment<byte>(buffer), CancellationToken.None
//       );

//       if (receiveResult.CloseStatus is not null)
//       {
//         await webSocket.CloseAsync(
//           receiveResult.CloseStatus.Value,
//           receiveResult.CloseStatusDescription,
//           CancellationToken.None
//         );
//       }
//     }

//     WebSocketManager.webSockets.Remove(webSocket);
// }

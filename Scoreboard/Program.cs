using SignalRSendData.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddSingleton<ScoreboardService>();

var app = builder.Build();

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapHub<DataHub>("/dataHub");

app.Run();


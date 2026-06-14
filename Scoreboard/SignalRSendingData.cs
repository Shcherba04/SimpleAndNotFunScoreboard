using Microsoft.AspNetCore.SignalR;

namespace SignalRSendData.Hubs
{
    public class DataHub : Hub
{
    private readonly ScoreboardService _service;
    
    public DataHub(ScoreboardService service)
    {
        _service = service;
    }

    public async Task ResetAndChange(string player1N,string player2N,string description)
        {
            _service.ResetValue();
            _service.ChangeName(0,player1N);
            _service.ChangeName(1,player2N);
            _service.ChangeDescription(description);
            Player player1=_service.GetPlayer(0);
            Player player2=_service.GetPlayer(1);
            await Clients.All.SendAsync("ResetAndChangePlayers", player1, player2, description);
        }
    public async Task GetCurrentData()
        {
            string description=_service.GetDescription();
            Player player1=_service.GetPlayer(0);
            Player player2=_service.GetPlayer(1);
            await Clients.All.SendAsync("ReceiveCurrentData",description,player1,player2);
        }
    public async Task SwapPlayers()
        {
            _service.swap();
            Player player1=_service.GetPlayer(0);
            Player player2=_service.GetPlayer(1);
            await Clients.All.SendAsync("Swapped",player1,player2);
        }
    public async Task ScoreChange(int playerNumber, int score)
        {
            _service.ChangeScore(playerNumber,score);
            Player player1=_service.GetPlayer(0);
            Player player2=_service.GetPlayer(1);
            await Clients.All.SendAsync("UpdateScore",player1,player2);
        }
}
    
}
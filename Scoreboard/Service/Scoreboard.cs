using Microsoft.VisualBasic;

public class ScoreboardService()
{
    List<Player> Players = new List<Player>{
        new Player ( "Player 1", 0 ),
        new Player ( "Player 2 ", 0 )
    };

    String description;

public String GetDescription()
    {
        return description;
    }
public void ChangeDescription(string nDescription)
    {
        description = nDescription;
    }
public void ResetValue()
    {
        for(int i=0;i<Players.Count;i++)
        {
            Players[i].score=0;
        }
    }
public Player GetPlayer(int number)
    {
        return Players[number];
    }
public void ChangeName(int number,string name)
    {
        Players[number].name=name;
    }
public void ChangeScore(int number,int scorechanged)
    {
        Players[number].score=scorechanged;
    }
    public void swap()
    {
        Player examplePlayer = Players[0];
        Players[0]=Players[1];
        Players[1]=examplePlayer;
    }
}
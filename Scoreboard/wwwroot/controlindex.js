const connection = new signalR.HubConnectionBuilder()
    .withUrl("/dataHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
        await connection.invoke("GetCurrentData")   

        document.getElementById("Submit").addEventListener("click", () => {
            Player1=document.getElementById("Player1").value,
            Player2=document.getElementById("Player2").value,
            Description=document.getElementById("Description").value,
            connection.invoke("ResetAndChange", Player1,Player2,Description )
        })

        document.getElementById("switch").addEventListener("click", () => {
            connection.invoke("SwapPlayers")
        })
        
        document.getElementById("IncScoreP1").addEventListener("click",()=>{
            score=Number(document.getElementById("Player1Score").innerText),
            score+=1,
            connection.invoke("ScoreChange",0,score)
        })
        
        document.getElementById("DecScoreP1").addEventListener("click",()=>{
            score=Number(document.getElementById("Player1Score").innerText),
            score-=1
            connection.invoke("ScoreChange",0,score)
        })
        
        document.getElementById("IncScoreP2").addEventListener("click",()=>{
            score=Number(document.getElementById("Player2Score").innerText),
            score+=1
            connection.invoke("ScoreChange",1,score)
        })
    
        document.getElementById("DecScoreP2").addEventListener("click",()=>{
            score=Number(document.getElementById("Player2Score").innerText),
            score-=1,
            connection.invoke("ScoreChange",1,score)
        })

    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

// Start the connection.
start();

function updateDOM(description, player1, player2) {
    document.getElementById("Player1N").innerText = player1.name;
    document.getElementById("Player1Score").innerText = player1.score;
    document.getElementById("Player2N").innerText = player2.name;
    document.getElementById("Player2Score").innerText = player2.score;
    document.getElementById("descriptionN").innerText = description;
}

function updateDOMP(player1, player2) {
    document.getElementById("Player1N").innerText = player1.name;
    document.getElementById("Player1Score").innerText = player1.score;
    document.getElementById("Player2N").innerText = player2.name;
    document.getElementById("Player2Score").innerText = player2.score;
}

connection.on("ReceiveCurrentData", function(description, player1, player2) {
    updateDOM(description, player1, player2);
})


connection.on("ResetAndChangePlayers", function(player1, player2, description) {
    updateDOM(description, player1, player2);
})


connection.on("Swapped", function(player1, player2) {
    updateDOMP(player1, player2);
})


connection.on("UpdateScore", function(player1, player2) {
    updateDOMP(player1,player2)
})
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/dataHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
        await connection.invoke("GetCurrentData")   

    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

start();

function updateDOM(description, player1, player2) {
    document.getElementById("p1name").innerText = player1.name;
    document.getElementById("p1score").innerText = player1.score;
    document.getElementById("p2name").innerText = player2.name;
    document.getElementById("p2score").innerText = player2.score;
    document.getElementById("description").innerText = description;
}

function updateDOMP(player1, player2) {
    document.getElementById("p1name").innerText = player1.name;
    document.getElementById("p1score").innerText = player1.score;
    document.getElementById("p2name").innerText = player2.name;
    document.getElementById("p2score").innerText = player2.score;
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
document.addEventListener("DOMContentLoaded", function () {
  const loginContainer = document.getElementById("login-container");
  const gameContainer = document.getElementById("game-container");
  const rankingContainer = document.getElementById("ranking-container");
  const historyContainer = document.getElementById("history-container");

  const usernameInput = document.getElementById("username");
  const loginBtn = document.getElementById("login-btn");
  const gameBoard = document.getElementById("game-board");
  const restartBtn = document.getElementById("restart-btn");
  const gameStatus = document.getElementById("game-status");
  const rankingList = document.getElementById("ranking-list");
  const historyList = document.getElementById("history-list");
  const playerNameDisplay = document.createElement("p");  // 新增顯示玩家名稱

  let currentPlayer = "X";
  let gameBoardState = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;
  let username = "";

  // 顯示玩家名稱
  function displayPlayerName() {
    playerNameDisplay.textContent = `玩家名稱：${username}`;
    gameContainer.appendChild(playerNameDisplay);
  }

  // 登入功能
  loginBtn.addEventListener("click", function () {
    username = usernameInput.value.trim();
    if (username !== "") {
      loginContainer.style.display = "none";
      gameContainer.style.display = "block";
      displayPlayerName();  // 顯示玩家名稱
      fetchRanking(); // 載入排行榜
      fetchHistory(); // 載入歷史紀錄
    } else {
      alert("請輸入用戶名！");
    }
  });

  // 初始化遊戲板
  function initGameBoard() {
    gameBoard.innerHTML = "";
    gameBoardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameStatus.textContent = `當前玩家：${currentPlayer}`;
    gameOver = false;
    
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => cellClick(i));
      gameBoard.appendChild(cell);
    }
  }

  // 當玩家點擊某個格子
  function cellClick(index) {
    if (gameOver || gameBoardState[index] !== "") return;

    gameBoardState[index] = currentPlayer;
    const cells = gameBoard.querySelectorAll(".cell");
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
      gameStatus.textContent = `${currentPlayer} 獲勝！`;
      gameOver = true;
      saveHistory(); // 保存遊戲結果到伺服器
    } else if (gameBoardState.every(cell => cell !== "")) {
      gameStatus.textContent = "平局！";
      gameOver = true;
      saveHistory(); // 保存遊戲結果到伺服器
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      gameStatus.textContent = `當前玩家：${currentPlayer}`;
    }
  }

  // 檢查勝利條件
  function checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c];
    });
  }

  // 重新開始遊戲
  restartBtn.addEventListener("click", function () {
    initGameBoard();
  });

  // 保存遊戲歷史紀錄
  function saveHistory() {
    const result = gameOver ? (currentPlayer === "X" ? "X Wins" : "O Wins") : "Draw";
    const time = new Date().toISOString();
    const data = { player: username, winner: currentPlayer, result, time };

    fetch("http://localhost:3000/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      console.log("歷史紀錄已保存", data);
      fetchHistory(); // 重新載入歷史紀錄
    });
  }

  // 獲取歷史紀錄
  function fetchHistory() {
    fetch("http://localhost:3000/history")
      .then(response => response.json())
      .then(history => {
        historyList.innerHTML = "";
        history.forEach(record => {
          const li = document.createElement("li");
          li.textContent = `${record.player} - ${record.result} (${record.time})`;
          historyList.appendChild(li);
        });
      });
  }

  // 獲取排行榜
  function fetchRanking() {
    fetch("http://localhost/index.html")
      .then(response => response.json())
      .then(ranking => {
        rankingList.innerHTML = "";
        ranking.forEach(player => {
          const li = document.createElement("li");
          li.textContent = `${player.username} - ${player.score} 分`;
          rankingList.appendChild(li);
        });
      });
  }

  initGameBoard(); // 初始化遊戲
});


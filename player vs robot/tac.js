const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let h2 = document.querySelector("h2");
let started = false;
let s1 = document.querySelector(".s1");
let s3 = document.querySelector(".s3");
let s2 = document.querySelector(".s2");
let reset = document.querySelector(".reset");
let beginButton = document.querySelector(".begain");

document.addEventListener("keypress", () => {
  if (!started) {
    startGame();
  }
});

function startGame() {
  started = true;
  h2.innerText = `Player ${currentPlayer} Moves`;
  playGame();
}

function playGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (makeMove(cell)) {
        if (isBoardFull()) {
          handleTie();
          resetGame();
        } else if (checkWinner(currentPlayer)) {
          updateScore(currentPlayer);
          resetGame();
        } else {
          switchPlayer();
          updateUI();
          if (currentPlayer === 'O') {
            makeRobotMove();
          }
        }
      }
    });
  });
}

function isBoardFull() {
  return Array.from(cells).every(cell => cell.textContent !== "");
}

function handleTie() {

  s2.innerText = parseInt(s2.innerText) + 1;
}


function makeMove(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    return true;
  }
  return false;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateUI() {
  h2.innerText = `Player ${currentPlayer} Moves`;
}

function makeRobotMove() {
  const emptyCells = getEmptyCells();

  if (canWinNextMove(currentPlayer)) {
    updateScore('O');
    resetGame();
    return;
  }

  if (blockPlayerWin()) {
    return;
  }

  if (makeWinningMove(currentPlayer)) {
    return;
  }

  makeRandomMove(emptyCells);
}

function getEmptyCells() {
  return Array.from(cells).filter(cell => !cell.textContent);
}

function canWinNextMove(player) {
  return getEmptyCells().some(cell => {
    cell.textContent = player;
    const won = checkWinner(player);
    cell.textContent = "";
    return won;
  });
}

function blockPlayerWin() {
  const player = 'X';
  const emptyCells = getEmptyCells();

  for (const cell of emptyCells) {
    cell.textContent = player;
    if (checkWinner(player)) {
      cell.click();
      return true;
    }
    cell.textContent = "";
  }

  return false;
}

function makeWinningMove(player) {
  const emptyCells = getEmptyCells();

  for (const cell of emptyCells) {
    cell.textContent = player;
    if (checkWinner(player)) {
      cell.click();
      return true;
    }
    cell.textContent = "";
  }

  return false;
}

function makeRandomMove(emptyCells) {
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    randomCell.click();
  }
}

function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].classList.contains(player));
  });
}

function updateScore(player) {
  if (player === 'X') {
    s1.innerText = parseInt(s1.innerText) + 1;
    var audio= new Audio("mixkit-video-game-win-2016.wav");
    audio.play();
  } else if (player === 'O') {
    s3.innerText = parseInt(s3.innerText) + 1;
    var audio= new Audio("mixkit-retro-arcade-game-over-470.wav");
    audio.play();
  }
  
}

function resetGame() {
  setTimeout(() => {
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove('X', 'O');
    });
    h2.innerText = "Press any key to start";
    started = false;
  }, 2000);
}


reset.addEventListener("click", () => {
    s1.innerText = '0';
    s2.innerText = '0';
    s3.innerText = '0';

    resetGame();
});
beginButton.addEventListener("click", startGame);

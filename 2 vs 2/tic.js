const cells = document.querySelectorAll('.cell');
const Pcross = 'X';
const Pcircle = 'O';
let currentPlayer = Pcross;
let h2 = document.querySelector("h2");
let alertContainer = document.querySelector(".alert-container");
let alertDiv = document.querySelector(".alert");
let s1 = document.querySelector(".s1");
let s3 = document.querySelector(".s3");
let s2 = document.querySelector(".s2");
let reset = document.querySelector(".reset");
let begin = document.querySelector(".begain"); 
let started = false;


start();

begin.addEventListener("click", level1);
reset.addEventListener("click", () => {
    s1.innerText = '0';
    s2.innerText = '0';
    s3.innerText = '0';

    resetGame();
});

function start() {
    document.addEventListener("keypress", function () {
        h2.innerText = "Player 1 moves";
        currentPlayer = Pcross;
        level1();
    });
}

function level1() {
  console.log('click');
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove(Pcross, Pcircle);
        cell.addEventListener('click', cellClick);
    });
    document.addEventListener("keypress", function () {
        h2.innerText = "Player 1 moves";
        currentPlayer = Pcross;
    });
    started = true;
}

function resetGame() {
    h2.innerText = "Press any key to start";
    cells.forEach(cell => {
        cell.removeEventListener('click', cellClick);
        cell.classList.remove(Pcross, Pcircle);
        cell.textContent = "";
    });
    started = false;
}

function cellClick() {
  if (this.textContent === "" && started) {
      this.textContent = currentPlayer;
      this.classList.add(currentPlayer);

      if (checkWinner()) {
          displayWinner();
          resetGame();
      } else if (isBoardFull()) {
          s2.innerText = parseInt(s2.innerText) + 1;
          resetGame();
      } else {
          currentPlayer = currentPlayer === Pcross ? Pcircle : Pcross;
          h2.innerText = `Player ${currentPlayer === Pcross ? "1" : "2"} Moves`;

          if (currentPlayer === Pcircle) {

          }
      }
  }
}


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer);
    });
}

function isBoardFull() {
    return Array.from(cells).every(cell => cell.textContent !== "");
}

function displayWinner() {
    var audio= new Audio("mixkit-video-game-win-2016.wav");
    audio.play();
    if (currentPlayer === Pcross) {
        s1.innerText = parseInt(s1.innerText) + 1;
        showWinnerAlert("Player 1 (X) wins!");
    } else if (currentPlayer === Pcircle) {
        s3.innerText = parseInt(s3.innerText) + 1;
        showWinnerAlert("Player 2 (O) wins!");
    }
}

function showWinnerAlert(message) {
    alertDiv.innerText = message;
    alertContainer.style.display = "block";
    setTimeout(() => {
        alertContainer.style.display = "none";
    }, 3000);
}



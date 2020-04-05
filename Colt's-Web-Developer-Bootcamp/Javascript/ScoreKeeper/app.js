const player1Btn = document.getElementById("player1");
const player2Btn = document.querySelector('#player2');
const resetBtn = document.getElementById('reset');
const p1Display = document.getElementById('p1Display');
const p2Display = document.getElementById('p2Display');
const numInput = document.querySelector("input");
const winningScoreDisplay = document.querySelector('p span');
let p1Score = 0;
let p2Score = 0;
let gameOver = false;
let winningScore = 5;

player1Btn.addEventListener('click', function() {
    if (p1Score < winningScore && !gameOver) {
        p1Score++;
        if (p1Score === winningScore) {
            gameOver = true;
            p1Display.classList.add('winner');
        }
    }

    p1Display.textContent = p1Score;
});

player2Btn.addEventListener('click', function() {
    if (p2Score < winningScore && !gameOver) {
        p2Score++;
        if (p2Score === winningScore) {
            gameOver = true;
            p2Display.classList.add('winner');
        }
    }

    p2Display.textContent = p2Score;
});

resetBtn.addEventListener('click', function() {
    reset();
});

numInput.addEventListener('change', function() {
    winningScoreDisplay.textContent = numInput.value;
    winningScore = parseInt(numInput.value);
    reset();
});

const reset = () => {
    p1Score = 0;
    p2Score = 0;
    gameOver = false;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove('winner');
    p2Display.classList.remove('winner');
};
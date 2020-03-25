let guess;

let secretNumber = Math.floor(Math.random() * 10);

while (true) {
    guess = Number(prompt("Guess a number!"));
    if (guess === secretNumber) {
        alert("You got it right");
        break;
    } else if (guess > secretNumber) {
        alert("Too high. Guess again!");
    } else {
        alert("Too low. Guess again!");
    }
}
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.getElementById('message');
const h1 = document.querySelector('h1');
const resetBtn = document.getElementById('reset');
const modeBtns = document.querySelectorAll('.mode');
let colors = [];
let pickedColor;
const easyMode = 3;
const hardMode = 6;
let isEasy = false;

init();

function init() {
    setUpModeBtns();
    setUpSquares();
    reset();
}

function setUpModeBtns() {
    //mode buttons event listeners
    for (let i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener('click', function() {
            modeBtns[0].classList.remove('selected');
            modeBtns[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === "Easy" ? isEasy = true : isEasy = false;
            reset();
        });
    }
}

function setUpSquares() {
    for (let i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener('click', function() {
            //grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetBtn.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    if (isEasy) {
        //generate all new colors
        colors = generateRandomColors(easyMode);
    } else {
        //generate all new colors
        colors = generateRandomColors(hardMode);
    }
    resetBtn.textContent = 'New Colors'
        //pick a new random color from array
    pickedColor = pickColor();
    // change colordisplay to match picked color
    colorDisplay.textContent = pickedColor;
    // change color of sqares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    h1.style.backgroundColor = 'steelblue';
    messageDisplay.textContent = '';
}

resetBtn.addEventListener('click', function() {
    reset();
});

function changeColors(color) {
    //loop through all squares
    for (let i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    //generate random number between 0 and the lenght of the colors array
    let random = Math.floor(Math.random() * colors.length);
    // return the picked color from the color array
    return colors[random];
}

function generateRandomColors(size) {
    // make an array
    const arr = [];
    // repeat size times
    for (let i = 0; i < size; i++) {
        // get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor() {
    // pick  a 'red' from 0-255
    let red = Math.floor(Math.random() * 256);
    // pick a 'green' from 0-255
    let green = Math.floor(Math.random() * 256);
    // pick a 'blue' from 0-255
    let blue = Math.floor(Math.random() * 256);
    // form the rgb
    let rgb = "rgb(" + red + ', ' + green + ", " + blue + ")";
    return rgb;
}
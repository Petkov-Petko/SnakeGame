const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#reset");
const gameWidth = canvas.width;    
const gameHeight = canvas.height;
const boardBackground = "white";
const foodColor = 'red';    
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];


gameStart();
document.addEventListener("keydown", changeDirection);

function createFood(){
    function randomFood(min, max){
        const randNum = (Math.floor(Math.random() * (max - min) + min) / unitSize) * unitSize; 
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}   
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
}
function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nexttick();
    drawSnake()
}
function nexttick(){
    if (running){
        setTimeout(() => {
            clearBoard();
             drawFood();
             moveSnake();
             drawSnake();
             checkGameOver();
             nexttick();
        }, 75)
    }else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    
    ctx.clearRect(0, 0, gameWidth, gameHeight);
}


function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    
    if (
        Math.abs(snake[0].x - foodX) < unitSize &&
        Math.abs(snake[0].y - foodY) < unitSize
      ) {
        score += 1;
        scoreText.textContent = score;
        createFood();
      } else {
        const tail = snake.pop();
        ctx.clearRect(tail.x, tail.y, unitSize, unitSize);
      }
      
}

function changeDirection(event){
    const keyPressed = event.keyCode;
    
    // Check the key code and update the snake's direction
    switch (keyPressed) {
        case 37: // Left arrow key
            if (xVelocity === 0) {
                xVelocity = -unitSize;
                yVelocity = 0;
            }
            break;
        case 38: // Up arrow key
            if (yVelocity === 0) {
                xVelocity = 0;
                yVelocity = -unitSize;
            }
            break;
        case 39: // Right arrow key
            if (xVelocity === 0) {
                xVelocity = unitSize;
                yVelocity = 0;
            }
            break;
        case 40: // Down arrow key
            if (yVelocity === 0) {
                xVelocity = 0;
                yVelocity = unitSize;
            }
            break;
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    // ctx.clearRect(0, 0, gameWidth, gameHeight);
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, unitSize, unitSize);
        ctx.strokeRect(segment.x, segment.y, unitSize, unitSize);
    });
}

function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false
            break;
        case (snake[0].x >= gameWidth):
            running = false
            break;
        case (snake[0].y < 0):
            running = false
            break;
        case (snake[0].y >= gameHeight):
            running = false
            break;
    }
    for(let i = 1; i < snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false
        }
    }
}


function displayGameOver() {
    ctx.clearRect(0, 0, gameWidth, gameHeight); // Clear the canvas
    ctx.font = "30px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center"; // Set text alignment to center
    ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2); // Display text in the center
    running = false;
}
resetBtn.addEventListener("click", () => {
    // Reset the game state
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    xVelocity = unitSize;
    yVelocity = 0;
    score = 0;
    scoreText.textContent = score;
    running = true;
    createFood();
    clearBoard();
    drawFood();
    drawSnake();
    nexttick();
});

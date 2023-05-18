const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver=false;
let foodX, foodY;
let snakeX=5, snakeY=10;
let snakeBody = [];
let velocityX = 0, velocityY=0;
let setIntervalId;
let score=0;

//Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = ()=> {
    //Passing a random number 0-30 value as food Position
    foodX=Math.floor(Math.random() * 30) + 1;
    foodY=Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = ()=> {
    //clearing the reloading the page
    clearInterval(setIntervalId);
    alert("Game Over! Press Ok to replay..");
    location.reload();
}

const changeDirection = (e)=> {
    //Changing Velocity Value based on Key Press
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
    }

}


const initGame = ()=> {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    //Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();   
        snakeBody.push([foodX, foodY]); // Pushing food position to array
        score++; //increment score by 1

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
        
    }
    
    for(let i=snakeBody.length -1; i > 0; i--){
        //shifting forward the value of elements in the snake body one by one
        snakeBody[i] = snakeBody[i -1];
    }

        snakeBody[0] = [snakeX, snakeY];

    //Updating the Snake's head position based on the crrent velocity
    snakeX += velocityX;
    snakeY += velocityY;

    //checking if the snake's head is out of wall, if so setting gameOver is true
    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }


    for(let i = 0; i < snakeBody.length; i++){
        //Adding a div for each part of the snake's body
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true;
    }
}
    playBoard.innerHTML=htmlMarkup;
} 

changeFoodPosition();
setIntervalId = setInterval(initGame, 120);
document.addEventListener("keydown", changeDirection);
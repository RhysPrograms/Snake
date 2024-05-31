// Define the HTML elements
const board = document.querySelector(".game-board");
const instructions = document.querySelector("#instruction-text");
const logo = document.querySelector("#logo");

// Define the game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw the game map, snake, and food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

// Draw the snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// Create the snake, or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of the snake, or the food
function setPosition(element, position) {
  element.style.gridColumnStart = position.x; // Horizontal
  element.style.gridRowStart = position.y; // Vertical
}

// Draw food function
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

// Generating the Food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval();
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// setInterval(() => {
//   move();
//   draw();
// }, 200);

function startGame() {
  gameStarted = true;
  instructions.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    // checkCollision();
    draw();
  }, gameSpeedDelay);
}

//draw();

// Keypress Event Listener
function handleKeyPress(event) {
  if (!gameStarted && event.code === "Space") {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);

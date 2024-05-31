// Define the HTML elements
const board = document.querySelector(".game-board");

// Define the game variables
let snake = [{ x: 10, y: 10 }];

// Draw the game map, snake, and food
function draw() {
  board.innerHTML = "";
  drawSnake();
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
  element.style.gridColumn = position.x; // Horizontal
  element.style.gridRow = position.y; // Vertical
}

draw();

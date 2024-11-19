const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let food = { x: getRandomCoord(), y: getRandomCoord() };
let direction = "RIGHT";
let score = 0;
let gameInterval;

document.addEventListener("keydown", changeDirection);
document.getElementById("restartBtn").addEventListener("click", restartGame);

function getRandomCoord() {
  return Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
}

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
  moveSnake();
  checkCollision();
}

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "#0f0";
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    ctx.strokeStyle = "#111";
    ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
  });
}

function drawFood() {
  ctx.fillStyle = "#ff0000";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#ff0000";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
  ctx.shadowBlur = 0;
}

function moveSnake() {
  const head = { ...snake[0] };
  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").innerText = score;
    food = { x: getRandomCoord(), y: getRandomCoord() };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
  }
}

function restartGame() {
  snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").innerText = score;
  food = { x: getRandomCoord(), y: getRandomCoord() };
  clearInterval(gameInterval);
  gameInterval = setInterval(draw, 100);
}

gameInterval = setInterval(draw, 100);

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let baseSpeed = 150;
let speed = baseSpeed;
let intervalId;
let score = 0;
let isGameOver = false;

function gameLoop() {
    if (isGameOver) return;
    update();
    draw();
}

function update() {
    // Nếu chưa có hướng di chuyển thì không update rắn (không tự cắn khi chưa bấm phím)
    if (dx === 0 && dy === 0) return;

    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Rắn đi xuyên tường
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;

    // Kiểm tra tự cắn
    for (let part of snake) {
        if (part.x === head.x && part.y === head.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        speed = Math.max(50, baseSpeed - score * 5); // Tăng tốc
        clearInterval(intervalId);
        intervalId = setInterval(gameLoop, speed);
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Hiển thị điểm số
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 25);

    ctx.fillStyle = '#0f0';
    for (let part of snake) {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    }

    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    if (isGameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '24px Arial';
        ctx.fillText('Press [Space] or Restart', canvas.width / 2, canvas.height / 2 + 20);
        ctx.textAlign = 'left';
    }
}

function placeFood() {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        // Không trùng với thân rắn
        if (!snake.some(part => part.x === newFood.x && part.y === newFood.y)) break;
    }
    food = newFood;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = dy = 0;
    score = 0;
    speed = baseSpeed;
    isGameOver = false;
    placeFood();
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, speed);
    draw();
}

function gameOver() {
    isGameOver = true;
    clearInterval(intervalId);
    draw();
}

document.addEventListener('keydown', e => {
    if (isGameOver && (e.key === ' ' || e.key === 'Spacebar')) {
        resetGame();
        return;
    }
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0; dy = -1;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0; dy = 1;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -1; dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = 1; dy = 0;
    }
});

// Nút restart trên web (nếu có)
const restartBtn = document.getElementById('restart');
if (restartBtn) {
    restartBtn.onclick = resetGame;
}

// Bắt đầu game
resetGame();

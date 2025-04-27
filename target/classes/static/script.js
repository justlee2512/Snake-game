const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let speed = 150;

function gameLoop() {
    update();
    draw();
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }
    
    for (let part of snake) {
        if (part.x === head.x && part.y === head.y) {
            resetGame();
            return;
        }
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    for (let part of snake) {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize-2, gridSize-2);
    }

    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = dy = 0;
    placeFood();
}

document.addEventListener('keydown', e => {
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

setInterval(gameLoop, speed);
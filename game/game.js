import { DIRECTION } from './constants.js';
import { createSnake, moveSnake, changeDirectionSnake } from './snake.js';
import { createApple, moveApple } from './apple.js';

// 1000/x where 'x' is the number which defines the fps
const fps = 15;
const ms = 1000 / fps;
const scale = 10;

const renderSnake = (ctxt, snake) => {
    snake.body.forEach(({ x, y }) => {
        ctxt.fillStyle = snake.color;
        ctxt.fillRect(x, y, 1, 1);
    });
}

const renderApple = (ctxt, apple) => {
    ctxt.beginPath();
    ctxt.arc(apple.x + .5, apple.y + .5, apple.radius, 0, 2 * Math.PI, false);
    ctxt.fillStyle = apple.color;
    ctxt.fill();
}

const hasEatenApple = (snake, apple) => {
    const { head } = snake;
    return head.x === apple.x && head.y === apple.y;
}

const hasCollideItself = (snake) => {
    const { head } = snake;
    // Take all the body unless the head
    const body = snake.body.slice(0, snake.body.length - 1);
    return !! body.find(item => item.x === head.x && item.y === head.y);
}

const keyHandler = (e) => {
    var code = e.keyCode;
    switch (code) {
        case 37: return DIRECTION.LEFT;
        case 38: return DIRECTION.UP;
        case 39: return DIRECTION.RIGHT;
        case 40: return DIRECTION.DOWN;
        default: return undefined;
    }
}

const loop = (ctxt, canvas, snake, apple) => {
    const interval = setInterval(() => {
        const dead = step(ctxt, canvas, snake, apple);
        if (dead) {
            clearInterval(interval);
        }
    }, ms);

    return interval;
}

const step = (ctxt, canvas, snake, apple) => {
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
    const collisionApple = hasEatenApple(snake, apple);
    if (collisionApple) {
        moveApple(
            apple,
            Math.floor(Math.random() * (canvas.width / scale - 0) + 0),
            Math.floor(Math.random() * (canvas.height / scale - 0) + 0),
        );
    }
    moveSnake(snake, { height: canvas.height / scale, width: canvas.width / scale }, collisionApple);
    renderSnake(ctxt, snake);
    renderApple(ctxt, apple);
    return hasCollideItself(snake);
}

const init = (placeholder) => {
    let interval;
    let canvas = placeholder;
    if (typeof (placeholder) === 'string') {
        canvas = document.getElementById(placeholder);
    }

    const snake = createSnake();
    const apple = createApple(6, 7);

    window.addEventListener('keydown', (e) => {
        const direction = keyHandler(e);
        changeDirectionSnake(snake, direction);
    }, false);

    const ctxt = canvas.getContext('2d');
    ctxt.scale(scale, scale);

    renderSnake(ctxt, snake);
    renderApple(ctxt, apple);
    interval = loop(ctxt, canvas, snake, apple);

    const btnStart = document.getElementById('start');
    const btnStop = document.getElementById('stop');
    const btnStep = document.getElementById('step');

    btnStart.addEventListener('click', (e) => {
        if (!interval) {
            interval = loop(ctxt, canvas, snake, apple);
        }
    });
    btnStop.addEventListener('click', (e) => {
        clearInterval(interval);
        interval = 0;
    });
    btnStep.addEventListener('click', (e) => {
        step(ctxt, canvas, snake);
    });
}

export default init;
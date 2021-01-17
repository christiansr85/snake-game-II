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

const clearCircle = (context, x, y, radius) => {
    context.save();
    context.beginPath();
    context.arc(x + .5, y + .5, radius, 0, 2 * Math.PI, true);
    context.clip();
    context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    context.restore();
}

const hasEatenApple = (snake, apple) => {
    const { head } = snake;
    return head.x === apple.x && head.y === apple.y;
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
        step(ctxt, canvas, snake, apple);
    }, ms);

    return interval;
}

const step = (ctxt, canvas, snake, apple) => {
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
    // clearCircle(ctxt, apple.x, apple.y, apple.radius);
    const collisionApple = hasEatenApple(snake, apple);
    if (collisionApple) {
        moveApple(
            apple,
            Math.floor(Math.random() * (canvas.width/scale - 0) + 0),
            Math.floor(Math.random() * (canvas.height/scale - 0) + 0),
        );
    }
    moveSnake(snake, { height: canvas.height / scale, width: canvas.width / scale }, collisionApple);
    renderSnake(ctxt, snake);
    renderApple(ctxt, apple);
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
import { Direction } from './constants.js';
import { createSnake, moveSnake, changeDirectionSnake } from './snake.js';

// 1000/x where 'x' is the number which defines the fps
const ms = 1000 / 25;
const scale = 10;

const renderSnake = (ctxt, snake) => {
    snake.body.forEach(([x, y]) => {
        ctxt.fillRect(x, y, 1, 1);
    });
}

const check = (e) => {
    var code = e.keyCode;
    switch (code) {
        case 37: return Direction.LEFT;
        case 38: return Direction.UP;
        case 39: return Direction.RIGHT;
        case 40: return Direction.DOWN;
        default: return undefined;
    }
}

const loop = (ctxt, canvas, snake) => {
    const interval = setInterval(() => {
        step(ctxt, canvas, snake);
    }, ms);

    return interval;
}

const step = (ctxt, canvas, snake) => {
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake(snake, { height: canvas.height / scale, width: canvas.width / scale });
    renderSnake(ctxt, snake);
}

const init = (placeholder) => {
    let interval;
    let canvas = placeholder;
    if (typeof (placeholder) === 'string') {
        canvas = document.getElementById(placeholder);
    }

    const snake = createSnake();

    window.addEventListener('keydown', (e) => {
        const direction = check(e);
        changeDirectionSnake(snake, direction);
    }, false);

    const ctxt = canvas.getContext('2d');
    ctxt.scale(scale, scale);

    renderSnake(ctxt, snake);
    interval = loop(ctxt, canvas, snake);

    const btnStart = document.getElementById('start');
    const btnStop = document.getElementById('stop');
    const btnStep = document.getElementById('step');

    btnStart.addEventListener('click', (e) => {
        // e.stopPropagation();
        interval = loop(ctxt, canvas, snake);
    });
    btnStop.addEventListener('click', (e) => {
        // e.stopPropagation();
        clearInterval(interval);
    });
    btnStep.addEventListener('click', (e) => {
        // e.stopPropagation();
        step(ctxt, canvas, snake);
    });
}

export default init;
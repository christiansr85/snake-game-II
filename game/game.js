import { DIRECTION, INTERVAL, SCALE } from './constants.js';
import {
    getCanvas,
    getContext,
    stepContext,
    renderAppleContext,
    renderSnakeContext,
    getRandomCoordinatesCanvas,
    getBoundsCanvas,
} from './gameRendererCanvas.js';
import { createSnake, moveSnake, changeDirectionSnake } from './snake.js';
import { createApple, moveApple } from './apple.js';

const showDeath = () => {
    const died = document.getElementById('died');
    died.classList.remove('hidden');
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

const init = (placeholder) => {
    let interval;
    const canvas = getCanvas(placeholder);
    const ctxt = getContext(canvas, SCALE);

    window.addEventListener('keydown', (e) => {
        const direction = keyHandler(e);
        changeDirectionSnake(snake, direction);
    }, false);

    const hasEatenApple = (snake, apple) => {
        const { head } = snake;
        return head.x === apple.x && head.y === apple.y;
    }

    const hasCollideItself = (snake) => {
        const { head } = snake;
        // Take all the body unless the head
        const body = snake.body.slice(0, snake.body.length - 1);
        return !!body.find(item => item.x === head.x && item.y === head.y);
    }

    const getRandomCoordinates = getRandomCoordinatesCanvas(canvas, SCALE);
    const getBounds = getBoundsCanvas(canvas, SCALE);
    const renderSnake = renderSnakeContext(ctxt);
    const renderApple = renderAppleContext(ctxt);
    const step = stepContext(ctxt, canvas);

    const snake = createSnake();
    const apple = createApple(getRandomCoordinates());

    const loop = (snake, apple) => {
        const interval = setInterval(() => {
            const dead = step(() => {
                const collisionApple = hasEatenApple(snake, apple);
                if (collisionApple) {
                    moveApple(
                        apple,
                        getRandomCoordinates()
                    );
                }
                moveSnake(snake, collisionApple, getBounds());
                renderSnake(snake);
                renderApple(apple);
                return hasCollideItself(snake);
            });
            if (dead) {
                clearInterval(interval);
                showDeath();
            }
        }, INTERVAL);

        return interval;
    }

    renderSnake(snake);
    renderApple(apple);
    interval = loop(snake, apple);

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
        step(ctxt, canvas, snake, apple);
    });
}

export default init;
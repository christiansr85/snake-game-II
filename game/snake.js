import { DIRECTION, DIRECTIONXY } from './constants.js';

const isValidDirection = (snake, direction) => {
    const snakeDirectionXY = DIRECTIONXY[snake.direction];
    const directionXY = DIRECTIONXY[direction];
    return (snakeDirectionXY[0] + directionXY[0]) !== 0;
}

export const createSnake = () => {
    const snake = {
        head: {
            x: 1, y: 4
        },
        color: '#000',
        direction: DIRECTION.DOWN,
        body: [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 1, y: 3 },
            { x: 1, y: 4 },
        ]
    };
    return snake;
}

export const changeDirectionSnake = (snake, direction) => {
    if (!direction || !isValidDirection(snake, direction)) {
        return snake;
    }
    snake.direction = direction || snake.direction;
    return snake;
}

export const moveSnake = (snake, grow, bounds) => {
    const lastItem = snake.body[snake.body.length - 1];
    const directionXY = DIRECTIONXY[snake.direction];
    const newItem =
    {
        x: (bounds.width + lastItem.x + directionXY[0]) % bounds.width,
        y: (bounds.height + lastItem.y + directionXY[1]) % bounds.height,
    };

    snake.body.push(newItem);
    snake.head = newItem;
    !grow && snake.body.shift();
    return snake;
}
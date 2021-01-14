import { Direction, DirectionXY } from './constants.js';

const isValidDirection = (snake, direction) => {
    const snakeDirectionXY = DirectionXY[snake.direction];
    const directionXY = DirectionXY[direction];
    return (snakeDirectionXY[0] + directionXY[0]) !== 0;
}

export const createSnake = () => {
    const snake = {
        direction: Direction.DOWN,
        body: [
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 3],
            [1, 4],
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

export const moveSnake = (snake, bounds) => {
    const lastItem = snake.body[snake.body.length - 1];
    const directionXY = DirectionXY[snake.direction];
    const newItem = [
        (bounds.height + lastItem[0] + directionXY[0]) % bounds.height,
        (bounds.width + lastItem[1] + directionXY[1]) % bounds.width,
    ];
    snake.body.push(newItem);
    snake.body.shift();
    // console.log('last item: ', lastItem)
    // console.log('snake: ', snake)
    return snake;
}
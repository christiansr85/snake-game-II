export const Direction = Object.freeze({
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
});

export const DirectionXY = Object.freeze({
    [Direction.UP]: [0, -1],
    [Direction.DOWN]: [0, 1],
    [Direction.LEFT]: [-1, 0],
    [Direction.RIGHT]: [1, 0],
});
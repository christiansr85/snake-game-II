export const DIRECTION = Object.freeze({
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
});

export const DIRECTIONXY = Object.freeze({
    [DIRECTION.UP]: [0, -1],
    [DIRECTION.DOWN]: [0, 1],
    [DIRECTION.LEFT]: [-1, 0],
    [DIRECTION.RIGHT]: [1, 0],
});

export const APPLE_RADIUS = 0.5;
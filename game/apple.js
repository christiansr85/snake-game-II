import { APPLE_RADIUS } from './constants.js';
export const createApple = (x, y) => {
    return {
        color: '#0000FF',
        x: x,
        y: y,
        radius: APPLE_RADIUS,
    };
}

export const moveApple = (apple, x, y) => {
    apple.x = x;
    apple.y = y;
}
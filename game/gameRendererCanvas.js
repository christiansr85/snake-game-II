export const renderSnakeContext = (ctxt) => (snake) => {
    snake.body.forEach(({ x, y }) => {
        ctxt.fillStyle = snake.color;
        ctxt.fillRect(x, y, 1, 1);
    });
}

export const renderAppleContext = (ctxt) => (apple) => {
    ctxt.beginPath();
    ctxt.arc(apple.x + .5, apple.y + .5, apple.radius, 0, 2 * Math.PI, false);
    ctxt.fillStyle = apple.color;
    ctxt.fill();
}

export const getBoundsCanvas = (canvas, scale) => () => {
    return { height: canvas.height / scale, width: canvas.width / scale };
}

export const clearCanvas = (ctxt, canvas) => () => {
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
}

export const getCanvas = (placeholder) => {
    let canvas = placeholder;
    if (typeof (placeholder) === 'string') {
        canvas = document.getElementById(placeholder);
    }
    return canvas;
}

export const getContext = (canvas, scale) => {
    const ctxt = canvas.getContext('2d');
    scale && ctxt.scale(scale, scale);

    return ctxt;
}

export const stepContext = (ctxt, canvas) => (steps) => {
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
    return steps();
}

export const getRandomCoordinatesCanvas = (canvas, scale) => () => {
    return {
        x: Math.floor(Math.random() * (canvas.width / scale - 0) + 0),
        y: Math.floor(Math.random() * (canvas.height / scale - 0) + 0),
    }
}
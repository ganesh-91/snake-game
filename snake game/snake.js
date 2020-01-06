var canvas, ctx;
window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownEvent);
    // render X times per second
    var x = 8;
    setInterval(draw, 1000 / x);
};
// game world
var gridSize = (tileSize = 20); // 20 x 20 = 400
var nextX = (nextY = 0);
var pausePlayer = false;
// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);
// apple
var appleX = (appleY = 15);
// draw
function draw() {
    // move snake in next pos
    snakeX += nextX;
    snakeY += nextY;
    // snake over game world?
    switch (true) {
        case snakeX < 0:
        case snakeX > gridSize - 1:
        case snakeY < 0:
        case snakeY > gridSize - 1:
            console.log('crash')
            snakeX = snakeY = 10;
            tailSize = defaultTailSize;
            pausePlayer = true;
            paintArena();
            paintPlayer();
            paintApple();
            break;

        default:
            break;
    }
    // if (snakeX < 0) {
    //     snakeX = gridSize - 1;
    // }
    // if (snakeX > gridSize - 1) {
    //     snakeX = 0;
    // }
    // if (snakeY < 0) {
    //     snakeY = gridSize - 1;
    // }
    // if (snakeY > gridSize - 1) {
    //     snakeY = 0;
    // }
    //snake bite apple?
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }

    if (!pausePlayer) {
        updatePlayer();
    }
}

function paintArena() {
    //paint background
    ctx.fillStyle = "#1C1D24";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paintPlayer() {
    // paint snake
    // Create gradient
    grd = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
    // Add colors
    grd.addColorStop(0.000, 'rgba(247, 149, 51, 1.000)');
    grd.addColorStop(0.151, 'rgba(243, 112, 85, 1.000)');
    grd.addColorStop(0.311, 'rgba(239, 78, 123, 1.000)');
    grd.addColorStop(0.462, 'rgba(161, 102, 171, 1.000)');
    grd.addColorStop(0.621, 'rgba(80, 115, 184, 1.000)');
    grd.addColorStop(0.748, 'rgba(16, 152, 173, 1.000)');
    grd.addColorStop(0.875, 'rgba(7, 179, 155, 1.000)');
    grd.addColorStop(1.000, 'rgba(111, 186, 130, 1.000)');

    ctx.fillStyle = grd;

    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );
        //snake bites it's tail?
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            tailSize = defaultTailSize;
        } else if (snakeTrail[i].y == canvas.width) {
            // tailSize = defaultTailSize;
            // console.table('snakeTraily', snakeTrail[i], 'snakeX', snakeX, 'snakeY', snakeY)
        } else if (snakeTrail[i].x * tileSize === canvas.width - tileSize) {
            // tailSize = defaultTailSize;
            // console.table('snakeTrailx', snakeTrail[i], 'snakeX', snakeX, 'snakeY', snakeY)
        }
        // console.table('snakeTrailx', tileSize)
    }
}

function paintApple() {
    // paint apple
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
    //set snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
}

function updatePlayer() {
    paintArena();
    paintPlayer();
    paintApple();

    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }
}
// input
function keyDownEvent(e) {
    console.log(e.keyCode)
    switch (e.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
        case 80:
            pausePlayer = !pausePlayer;
            break;
    }
}

function Sun({startX, startY, moveSpeed}) {
    this.x = startX;
    this.y = startY;
    this.moveSpeed = moveSpeed;
}

function drawBackground(ctx, canvasWidth) {
    ctx.fillStyle = 'rgb(0, 148, 255)';
    ctx.fillRect(0, 0, canvasWidth, 400);
}

function drawCloudPart(ctx, startX, startY, radiusX, radiusY, color) {
    ctx.beginPath();
    ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCloud(ctx, startX, startY) {
    drawCloudPart(ctx, startX, startY, 50, 25, '#C8E0F4');
    drawCloudPart(ctx, startX - 35, startY + 10, 50, 25, '#C8E0F4');
    drawCloudPart(ctx, startX + 35, startY + 10, 50, 25, '#C8E0F4');
}

function drawClouds(ctx) {
    drawCloud(ctx, 500, 70);
    drawCloud(ctx, 200, 150);
    drawCloud(ctx, 800, 130);
}

function drawFrontground(ctx, canvasWidth) {
    //grass
    ctx.fillStyle = '#42B14E';
    ctx.fillRect(0, 400, canvasWidth, 100);

    //house
    ctx.fillStyle = '#C89300';
    ctx.fillRect(380, 275, 260, 220);

    ctx.fillStyle = '#666666';
    ctx.fillRect(570, 175, 30, 100);

    ctx.strokeStyle = '#5E5D59';
    ctx.beginPath();
    ctx.moveTo(380, 275);
    ctx.lineTo(510, 140);
    ctx.lineTo(640, 275);
    ctx.lineTo(380, 275);
    ctx.stroke();
    ctx.fillStyle = '#E60000';
    ctx.fill();

    ctx.fillStyle = '#FFDF5C';
    ctx.fillRect(470, 310, 80, 100);

    ctx.strokeStyle = '#5E5D59';
    ctx.beginPath();
    ctx.moveTo(470, 310);
    ctx.lineTo(550, 310);
    ctx.lineTo(550, 410);
    ctx.lineTo(470, 410);
    ctx.lineTo(470, 310);
    ctx.moveTo(510, 310);
    ctx.lineTo(510, 410);
    ctx.moveTo(470, 360);
    ctx.lineTo(550, 360);
    ctx.stroke();
}

function drawSun(ctx, sun) {
    ctx.fillStyle = '#FFEA93';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, 50, 0, Math.PI * 2);
    ctx.fill();
}

function redraw(ctx, width, sun) {
    drawBackground(ctx, width);
    drawClouds(ctx);
    drawFrontground(ctx, width);
    drawSun(ctx, sun)
}

function moveSun({sun, speed, radius, centerX, centerY, dt}) {
    const distance = sun.moveSpeed * dt;
    sun.x += Math.cos(speed * distance) * radius + centerX;
    syn.y += Math.sin(speed * distance) * radius + centerY;
}

function update({sun, speed, radius, centerX, centerY, dt}) {
    moveSun({sun, speed, radius, centerX, centerY, dt});
}

function createSun() {
    const startX = 500;
    const startY = 400;
    const moveSpeed = 1; //радиан

    return new Sun({
        startX,
        startY,
        moveSpeed
    });
}

function main() {
    const canvas = document.getElementById('canvas');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    const radius = 300;

    createSun();
    redraw(ctx, width, sun);

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update({sun, speed, radius, centerX, centerY, dt: deltaTime});
        redraw(ctx, width, sun);
        requestAnimationFrame(animateFn);
    }

    animateFn();
}

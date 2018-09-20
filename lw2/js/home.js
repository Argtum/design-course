function drawBackground(ctx, canvasWidth) {
    //top background
    ctx.fillStyle = 'rgb(0, 148, 255)';
    ctx.fillRect(0, 0, canvasWidth, 400);

    //bottom background
    ctx.fillStyle = '#42B14E';
    ctx.fillRect(0, 400, canvasWidth, 100);
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

function drawSky(ctx) {
    //sun
    ctx.beginPath();
    ctx.arc(20, 20, 100, 0, Math.PI * 2);
    ctx.fillStyle = '#FFEA93';
    ctx.fill();

    //cloud
    drawCloud(ctx, 500, 70);
    drawCloud(ctx, 200, 150);
    drawCloud(ctx, 800, 130);
}

function drawHouse(ctx) {
    ctx.fillStyle = '#C89300';
    ctx.fillRect(380, 275, 260, 220);

    ctx.fillStyle = '#666666';
    ctx.fillRect(570, 175, 30, 100);

    ctx.beginPath();
    ctx.moveTo(380, 275);
    ctx.lineTo(510, 140);
    ctx.lineTo(640, 275);
    ctx.lineTo(380, 275);
    ctx.strokeStyle = '#5E5D59';
    ctx.stroke();
    ctx.fillStyle = '#E60000';
    ctx.fill();

    ctx.fillStyle = '#FFDF5C';
    ctx.fillRect(470, 310, 80, 100);

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
    ctx.strokeStyle = '#5E5D59';
    ctx.stroke();
}

function draw() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');

    drawBackground(ctx, canvas.width);
    drawSky(ctx);
    drawHouse(ctx);
}

window.onload = function() {
    draw();
};
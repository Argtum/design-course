function drawBackground(ctx, canvasWidth) {
    ctx.fillStyle = 'rgb(0, 148, 255)';
    ctx.fillRect(0, 0, canvasWidth, 400);
}

function update({ctx, sunX, sunY}) {
    moveSun({ctx, sunX, sunY});
}

function redraw({ctx, width}) {
    drawBackground(ctx, width);
    drawClouds(ctx);
    drawFrontground(ctx, width);
}

function moveSun(ctx, speed, radius, centerX, centerY, width) {
    const circle = 60;// радиан
    for (let distance = 1; distance < circle; distance++)
    {
        let distance = 1;

        let sunX = Math.cos(speed * distance) * radius + centerX;
        let sunY = Math.sin(speed * distance) * radius + centerY;
        // drawBackground(ctx, width);
        // drawClouds(ctx);
        // drawFrontground(ctx, width);
        // drawSun(ctx, sunX, sunY);
        if (distance == circle - 1) {
            distance = 0;
        }
    }
}

function drawSun(ctx, posX, posY) {
    //sun
    ctx.beginPath();
    ctx.arc(posX, posY, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#FFEA93';
    ctx.fill();

    //cloud
    drawCloud(ctx, 500, 70);
    drawCloud(ctx, 200, 150);
    drawCloud(ctx, 800, 130);
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

function drawClouds(ctx, canvasWidth) {
    //cloud
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
    const radius = 300;
    const speed = 1; //радиан
    const centerX = 500;
    const centerY = 400;

    // moveSun(ctx, speed, radius, centerX, centerY, canvas.width);
    redraw({ctx, width});

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update({ctx, sunX, sunY});
        redraw({ctx, sunX, sunY, width});
        requestAnimationFrame(animateFn);
        }

    animateFn();
}

window.onload = function() {
    draw();
};
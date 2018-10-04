function drawTopBackground(ctx, canvasWidth, color) {
    //top background
    ctx.fillStyle = "hsl(" + (400 - color * 2) + "," + color + "%," + color + "%)";
    ctx.fillRect(0, 0, canvasWidth, 400);
}

function drawCloudPart(ctx, startX, startY, radiusX, radiusY, color) {
    ctx.beginPath();
    ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCloud(ctx, sky) {
    drawCloudPart(ctx, sky.x - 30, sky.y - 15, 40, 25, '#C8E0F4');
    drawCloudPart(ctx, sky.x + 25, sky.y - 20, 40, 25, '#C8E0F4');
    drawCloudPart(ctx, sky.x, sky.y, 40, 25, '#C8E0F4');
}

function drawSun(ctx, sun) {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#FFEA93';
    ctx.fill();
}

function drawSky(ctx, sky) {
    drawCloud(ctx, sky);
    drawCloud(ctx, sky);
    drawCloud(ctx, sky);
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

function drawBotomBackground(ctx, canvasWidth) {
    //bottom background
    ctx.fillStyle = '#42B14E';
    ctx.fillRect(0, 400, canvasWidth, 100);
}

function Sun({startX, startY, angle, speed}) {
    this.x = startX;
    this.y = startY;
    this.angle = angle;
    this.speed = speed;
}

function Sky({startX, startY, speed}) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
}

function redraw(ctx, canvasWidth, sun, skys) {
    drawTopBackground(ctx, canvasWidth, sun.color);
    drawSun(ctx, sun);
    for (const sky of skys) {
        drawSky(ctx, sky);
    }
    drawBotomBackground(ctx, canvasWidth);
    drawHouse(ctx);
}

function update(sun, dt, skys) {
    const deltaAngle = sun.speed * dt;
    sun.angle += deltaAngle;

    sun.x = Math.cos(sun.angle) * 400 + 500;
    sun.y = Math.sin(sun.angle) * 400 + 400;
    sun.color = (900 - sun.y) / 10;

    console.log(sun.color);

    for (let sky of skys) {
        const cloudStep = sky.speed * dt;
        if (sky.x < -200) {
            sky.x = 1200;
        }
        sky.x -= cloudStep;
    }
}

function CreateSun() {
    const startX = 0;
    const startY = 0;
    const angle = 0;
    const speed = 0.25;
    const color = 50;

    return new Sun({
        startX,
        startY,
        angle,
        speed,
        color
    })
}

function CreateSky({cloudHeight, cloudSpeed}) {
    const startX = Math.random() * 1200;
    const startY = Math.random() * cloudHeight;
    const speed = Math.random() * cloudSpeed;

    return new Sky({
        startX,
        startY,
        speed
    });
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    let skys = [];
    const cloudNumber = 3;
    let sun;

    for (let i = 0; i < cloudNumber; ++i) {
        skys.push(CreateSky({
            cloudHeight: 200,
            cloudSpeed: 100
        }));
    }

    console.log(skys);

    sun = CreateSun();

    redraw(ctx, canvas.width, sun, skys);

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update(sun, deltaTime, skys);
        redraw(ctx, canvas.width, sun, skys);
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();
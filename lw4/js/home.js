const CIRCLE_START_ANGLE = 0;
const CIRCLE_END_ANGLE = Math.PI * 2;
const ROTATION = Math.PI * 2;

const LEFT_EDGE_SCREEN = -200;
const RIGHT_EDGE_SCREEN = 1200;

const CLOUD_RADIUS_X = 40;
const CLOUD_RADIUS_Y = 25;
const NUMBERS_OF_CLOUDS = 3;
const CLOUDS_HEIGHT = 200;
const CLOUDS_SPEED = 150;

const TIME_STEP = 0.1;
const MIN_TIME_STAMP = 0.1;
const MAX_TIME_STAMP = 10;

function drawSky(ctx, canvasWidth, color) {
    ctx.fillStyle = "hsl(" + (CIRCLE_END_ANGLE - color * 1.7) + "," + color + "%," + color + "%)";
    ctx.fillRect(0, 0, canvasWidth, 400);
}

function drawCloudPart(ctx, startX, startY, radiusX, radiusY, color) {
    ctx.beginPath();
    ctx.ellipse(startX, startY, radiusX, radiusY, ROTATION, CIRCLE_START_ANGLE, CIRCLE_END_ANGLE);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCloud(ctx, sky) {
    drawCloudPart(ctx, sky.x - 30, sky.y + 15, sky.radX, sky.radY, '#C8E0F4');
    drawCloudPart(ctx, sky.x + 25, sky.y + 20, sky.radX, sky.radY, '#C8E0F4');
    drawCloudPart(ctx, sky.x, sky.y, sky.radX, sky.radY, '#C8E0F4');
}

function drawSun(ctx, sun) {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, sun.color, CIRCLE_START_ANGLE, CIRCLE_END_ANGLE);
    ctx.fillStyle = '#FFEA93';
    ctx.fill();
}

function drawClouds(ctx, sky) {
    drawCloud(ctx, sky);
    drawCloud(ctx, sky);
    drawCloud(ctx, sky);
}

function drawHouse(ctx, windowColor) {
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

    ctx.fillStyle = windowColor;
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

function drawGround(ctx, canvasWidth) {
    ctx.fillStyle = '#42B14E';
    ctx.fillRect(0, 400, canvasWidth, 100);
}

function Sun({sunStartX, sunStartY, sunX, sunY, sunRadius, sunMoveAngle, sunSpeed, sunMoveRadius, sunColor}) {
    this.startX = sunStartX;
    this.startY = sunStartY;
    this.X = sunX;
    this.y = sunY;
    this.radius = sunRadius;
    this.angle = sunMoveAngle;
    this.speed = sunSpeed;
    this.moveRadius = sunMoveRadius;
    this.color = sunColor;
}

function Cloud({startX, startY, speed, radiusX, radiusY}) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.radX = radiusX;
    this.radY = radiusY;
}

function redraw(ctx, canvasWidth, sun, skys, windowColor) {
    drawSky(ctx, canvasWidth, sun.color);
    drawSun(ctx, sun);
    for (const sky of skys) {
        drawClouds(ctx, sky);
    }
    drawGround(ctx, canvasWidth);
    drawHouse(ctx, windowColor);
}

function update(sun, dt, skys, timeVariable, freezeTime) {
    if (freezeTime) {
        const deltaAngle = sun.speed * timeVariable * dt;
        sun.angle += deltaAngle;

        sun.x = Math.cos(sun.angle) * sun.moveRadius + sun.startX;
        sun.y = Math.sin(sun.angle) * sun.moveRadius + sun.startY;
        sun.color = (800 - sun.y) / 10;

        for (let sky of skys) {
            const cloudStep = sky.speed * timeVariable * dt;
            if (sky.x < LEFT_EDGE_SCREEN) {
                sky.x = RIGHT_EDGE_SCREEN;
            }
            sky.x -= cloudStep;
        }
    }
}

function CreateCloud({start, cloudHeight, cloudSpeed, cloudRadiusX, cloudRadiusY}) {
    const startX = Math.random() * start;
    const startY = Math.random() * cloudHeight;
    const speed = Math.random() * cloudSpeed;
    const radiusX = cloudRadiusX;
    const radiusY = cloudRadiusY;

    return new Cloud({
        startX,
        startY,
        speed,
        radiusX,
        radiusY
    });
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    let lastTimestamp = Date.now(); //текущее время в ms
    let skys = [];
    const sunStartX = 500;
    const sunStartY = 400;
    const sunX = 0;
    const sunY = 0;
    const sunRadius = 50;
    const sunMoveAngle = 3;
    const sunSpeed = 0.25;
    const sunColor = 50;
    const sunMoveRadius = 400;
    let timeVariable = 1;
    let freezeTime = 1;
    let windowColor = '#FFDF5C';

    document.addEventListener("keydown", (buttonkey) => {
        if(buttonkey.keyCode == 107 && timeVariable <= MAX_TIME_STAMP) {
            timeVariable += TIME_STEP;
        }
    });

    document.addEventListener("keydown", (buttonkey) => {
        if(buttonkey.keyCode == 109 && timeVariable >= MIN_TIME_STAMP) {
            timeVariable -= TIME_STEP;
        }
    });

    document.addEventListener("keypress", (buttonkey) => {
        if(buttonkey.keyCode == 32) {
            freezeTime = freezeTime ? 0 : 1;
        }
    });

    document.addEventListener("click", (buttonkey) => {
        if(buttonkey.keyCode == 32) {
            freezeTime = freezeTime ? 0 : 1;
        }
    });

    canvas.addEventListener('click', function(event) {
        if (event.offsetX > 470 && event.offsetX < 550 && event.offsetY > 310 && event.offsetY < 410) {
            windowColor = (windowColor == '#FFDF5C') ? '#303030' : '#FFDF5C';
        }
    });

    for (let i = 0; i < NUMBERS_OF_CLOUDS; ++i) {
        skys.push(CreateCloud({
            start: RIGHT_EDGE_SCREEN,
            cloudHeight: CLOUDS_HEIGHT,
            cloudSpeed: CLOUDS_SPEED,
            cloudRadiusX: CLOUD_RADIUS_X,
            cloudRadiusY: CLOUD_RADIUS_Y
        }));
    }

    let sun = new Sun({sunStartX, sunStartY, sunX, sunY, sunRadius, sunMoveAngle, sunSpeed, sunMoveRadius, sunColor});
    redraw(ctx, canvas.width, sun, skys, windowColor);

    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001;
        lastTimestamp = currentTimeStamp;

        update(sun, deltaTime, skys, timeVariable, freezeTime);
        redraw(ctx, canvas.width, sun, skys, windowColor);
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();
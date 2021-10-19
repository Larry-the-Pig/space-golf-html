window.onload=function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("mousedown",mouseDown);
    document.addEventListener("mousemove",mouseMove);
    document.addEventListener("mouseup",mouseUp);
    setInterval(game,30);
}

var earth = new Image();
earth.src = "res/earth.png";

var asteroid = new Image();
asteroid.src = "res/asteroid.png";

var sun = new Image();
sun.src = "res/star.png";

let mousePress = false;

let ball = {
    x: 15.0,
    y: 15.0,
    width: 20,
    height: 20,
    speedX: 0.0,
    speedY: 0.0
}

let hole = {
    x: 70,
    y: 70,
    width: 50,
    height: 50
}

let star = {
    x: 256,
    y: 56,
    width: 100,
    height: 100
}

let mouse = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}

function game() {
    if (Math.abs(ball.speedX) > 0) {
        ball.speedX = 0.999 * ball.speedX;
    }
    if (Math.abs(ball.speedY) > 0) {
            ball.speedY = 0.999 * ball.speedY;
    }

    if (Math.abs(ball.speedX) < 0.01) {
        ball.speedX = 0.0;
    }
    if (Math.abs(ball.speedY) < 0.01) {
        ball.speedY = 0.0;
    }

    //Collision with left wall
    if (ball.x < 0) {
        ball.x = 0;
        ball.speedX = -ball.speedX;
    }

    //Collision with right wall
    if (ball.x > canv.width - ball.width) {
        ball.x = canv.width - ball.width;
        ball.speedX = -ball.speedX;
    }

    //Collision with ceiling
    if (ball.y < 0) {
        ball.y = 0;
        ball.speedY = -ball.speedY;
    }

    //Collision with floor
    if (ball.y > canv.height - ball.height) {
        ball.y = canv.height - ball.height;
        ball.speedY = -ball.speedY;
    }

    if ((Math.floor(ball.x) + ball.width >= hole.x && Math.floor(ball.x) <= hole.x + hole.width) && (Math.floor(ball.y) + ball.height >= hole.y && Math.floor(ball.y) <= hole.y + hole.height)) {
        newGame();
    }

    ball.speedX += 0.0000004 * 0.858407 * (star.height * star.width) * (star.width/2 + star.x - ball.x);
    ball.speedY += 0.0000004 * 0.858407 * (star.height * star.width) * (star.height/2 + star.y - ball.y);

    ball.x+=ball.speedX;
    ball.y+=ball.speedY;



    //Draw
    
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 5;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
 
    ctx.drawImage(earth, hole.x, hole.y);

    ctx.drawImage(sun, star.x, star.y, star.width, star.height);

    ctx.drawImage(asteroid, Math.floor(ball.x), Math.floor(ball.y));

    if (mousePress) {
        ctx.beginPath();
        ctx.moveTo(mouse.x1 - canv.getBoundingClientRect().left, mouse.y1 - canv.getBoundingClientRect().top);    // Move the pen to (30, 50)
        ctx.lineTo(mouse.x2 - canv.getBoundingClientRect().left, mouse.y2 - canv.getBoundingClientRect().top);  // Draw a line to (150, 100)
        ctx.closePath();
        ctx.stroke();
    }
}

function newGame() {
    ball.speedX = 0.0;
    ball.speedY = 0.0;
    
    ball.x = Math.floor(Math.random() * (canv.width - ball.width));
    ball.y = Math.floor(Math.random() * (canv.height - ball.height));
    
    hole.x = Math.floor(Math.random() * (canv.width - hole.width));
    hole.y = Math.floor(Math.random() * (canv.height - hole.height));
    
    star.x = Math.floor(Math.random() * (canv.width - star.width));
    star.y = Math.floor(Math.random() * (canv.height - star.width));
    
    star.width = Math.floor(Math.random() * (300 - 30)) + 30;
    star.height = star.width;
}
function mouseDown(evt) {
    mousePress = true;
    mouse.x1 = evt.clientX;
    mouse.y1 = evt.clientY;
}

function mouseUp(evt) {
    mousePress = false;
    mouse.x2 = evt.clientX;
    mouse.y2 = evt.clientY;

    ball.speedX += 0.1 * (mouse.x1 - mouse.x2);
    ball.speedY += 0.1 * (mouse.y1 - mouse.y2);
}

function mouseMove(evt) {
    mouse.x2 = evt.clientX;
    mouse.y2 = evt.clientY;
}
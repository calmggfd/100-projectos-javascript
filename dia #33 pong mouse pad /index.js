const canvas    =   document.getElementById("game");
const context   =   canvas.getContext("2d");
canvas.width    =   window.innerWidth;
canvas.height   =   window.innerHeight;

const paddleWidth   =   18,
    paddleHeight    =   120,
    paddleSpeed =   8,
    ballRadius  =   12,
    initialBallSpeed    =   8,
    maxBallSpeed    =   40,
    netWidth    =   5,
    netColor    =   "WHITE";

// DRAW NET ON CANVAS
function drawNet(){
    for(let i=0; i<=canvas.height; i+=15){
        drawRect(canvas.width   / 2 -netWidth / 2, i, netWidth, 10, netColor)
    }
}

// DRAW RECTANGLE ON CANVAS
function drawRect(x, y, width, height, color){
    context.fillStyle   =   color;
    context.fillRect(x, y, width, height, color);
}

// DRAW A CIRCLE ON CANVAS
function drawCircle(x, y, radius, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI    * 2, false);
    context.closePath();
    context.fill();
}

// DRAW TEXT ON CANVAS
function drawText(text, x,  y,  color, fontSize =   60, fontWeight  =   'bold', font    =   "Courier New"){
    context.fillStyle   =   color;
    context.font    =   `${fontWeight}  ${fontSize}px ${font}`;
    context.textAlign   =   "center";
    context.fillText(text, x, y);
}

// CREATE A PADDLE OBJECT
function createPaddle(x, y, width, height, color){
    return{ x, y, width, height, color, score: 0 };
}

// CREATE A BALL OBJECT
function createBall(x, y, radius, velocityX, velocityY, color){
    return  {   x,  y,  radius, velocityX,  velocityY,  color, speed: initialBallSpeed  };
}

// DEFINE USER AND COMPUTER PADDLE OBJECTS
const user  =   createPaddle(0, canvas.height   / 2 - paddleHeight / 2, paddleWidth, paddleHeight, "WHITE");

const com   =   createPaddle(canvas.width   -   paddleWidth, canvas.height  /   2   -   paddleHeight    /   2,  paddleWidth, paddleHeight,  "WHITE");

// DEFINE BALL OBJECT
const ball = createBall(canvas.width    /   2, canvas.height    /   2, ballRadius, initialBallSpeed, initialBallSpeed, "WHITE");

// UPDATE USER PADDLE  POSITION ON MOUSE MOVEMENT
canvas.addEventListener('mousemove', movePaddle);

function    movePaddle(event){
    const rect  = canvas.getBoundingClientRect();
    user.y  =   event.clientY   -   rect.top    -   user.height /   2;
}

// CHECK FOR COLLISION  BETWEEN BALL AND PADDLE
function collision (b, p){
    return(
        b.x +   b.radius    >   p.x &&  b.x - b.radius  <   p.x +   p.width && b.y  + b.radius  >   p.y && b.y  -   b.radius    <   p.y +   p.height
    );
}

// RESET BALL POSITION AND VELOCITY
function resetBall (){
    ball.x  =   canvas.width    /   2;
    ball.y  =   Math.random()   *   (canvas.height  -   ball.radius *   2)  +ballRadius;
    ball.velocityX  =   -ball.velocityX;
    ball.speed  =   initialBallSpeed;
}

// UPDATE GAME LOGIC
function    update(){
    // CHECK FOR SCORE AND RESET  BALL IF NECESSARY
    if(ball.x   - ball.radius   <   0){
        com.score++;
        resetBall();
    }else   if(ball.x   +   ball.radius >   canvas.width){
        user.score++;
        resetBall();
    }

    // UPDATE BALL POSITION
    ball.x  +=  ball.velocityX;
    ball.y  +=  ball.velocityY;

    // UPDATE  COMPUTER PADDLE POSITION BASED ON BALL POSITION 
    com.y   += (ball.y  -   (com.y  +   com.height  /   2)) *   0.1;

    // TOP AND BOTTOM WALLS
    if(ball.y   -    ball.radius    <   0   || ball.y   +   ball.radius >   canvas.height ){
        ball.velocityY  =   -ball.velocityY;
    }

    // DETERMINE WICH PADDLE IS BEGIN HIT BY THE BALL AND HANDLE COLLISION
    let player  =   ball.x  +   ball.radius < canvas.width  /   2   ?   user    :   com;
    if  (collision(ball, player)){
        const collidePoint  =   ball.y  -   (player.y   +   player.height   /   2);
        const   collisionAngle  =   (Math.PI    /   4)  *   (collidePoint   /   (player.height  /   2));
        const   direction   =   ball.x  +   ball.radius <   canvas.width    /   2   ?   1   :   -1;
        ball.velocityX  =   direction   *   ball.speed  *   Math.cos(collisionAngle);
        ball.velocityY  =   ball.speed  *   Math.sin(collisionAngle);

        // INCREASE BALL SPEED AND LIMIT TO MAX SPEED
        ball.speed  +=  0.2;
        if(ball.speed   >   maxBallSpeed){
            ball.speed  =   maxBallSpeed;
        }
    }
}

// RENDER GAME ON CANVAS
function render(){
    // CLEAR CANVAS WITH BLACK SCREEN
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawNet();

    // DRAW SCORES
    drawText(user.score,    canvas.width    /   4,  canvas.height   /   2,  "GRAY", 120,    'bold');
    drawText(com.score,    (3   *   canvas.width)   /   4,  canvas.height   /   2,  "GRAY", 120,    'bold');

    // DRAW PADDLE
    drawRect(user.x,    user.y, user.width, user.height,    user.color);
    drawRect(com.x, com.y,  com.width,  com.height, com.color);

    // DRAW BALL
    drawCircle(ball.x,  ball.y, ball.radius,    ball.color);
}

// RUN GAME LOOP
function gameLoop(){
    update();
    render();
}

// SET GAMELOOP TO RUN AT 60 FRAME PER SECOND
const framPerSec    =   60;
setInterval(gameLoop, 1000  /   framPerSec);
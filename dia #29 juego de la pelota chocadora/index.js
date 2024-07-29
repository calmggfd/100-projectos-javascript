let canvas  =   document.getElementById("game"),
    ctx =   canvas.getContext ('2d'),
    ballRadius  =   9,
    x   =   canvas.width    /   (Math.floor(Math.random()   *   Math.random()   *   10) +   3),
    y   =   canvas.height   -   40,
    dx  =   2,
    dy  =   -2;

let paddleHeight    =   12,
    paddleWidth =   72;

// PADDLE   START   POSITION
let paddleX =   (canvas.width   -   paddleWidth)    /   2;


let rowCount    =   5,
    columnCount =   9,
    brickWidth  =   54,
    brickHeight =   18,
    brickPadding    =   12,
    topOffset   =   40,
    leftOffset   =   33,
    score   =   0;


// BRICKS  ARRAY
let bricks  =   [];
for(let c   =   0;  c   <   columnCount;    c++){
    bricks[c]   =   [];
    for(let r   =   0;  r   <   rowCount;   r++){
        // SET POSITIONS OF BRICKS
        bricks[c][r]    =   {   x:  0,  y:  0,  status: 1};
    }
}

// MOUSE MOVING EVENTLISTENER AND FUNCTION
document.addEventListener("mousemove",  mouseMoveHandler,   false);

// MOVE PADDLE WIDTH MOUSE
function    mouseMoveHandler(e){
    var relativeX   =   e.clientX   -   canvas.offsetLeft;
    if(relativeX    >   0   &&  relativeX   <   canvas.width){
        paddleX =   relativeX   -   paddleWidth /   2;
    }
}

// DRAW PADDLE
function    drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(paddleX,  canvas.height   -   paddleHeight,   paddleWidth,    paddleHeight,   30);
    ctx.fillStyle   =   '#333';
    ctx.fill();
    ctx.closePath();
}

// DRAW BALL
function    drawBall()  {
    ctx.beginPath();
    ctx.arc(x,  y,  ballRadius, 0,  Math.PI *   2);
    ctx.fillStyle   =   '#333',
    ctx.fill();
    ctx.closePath();
}

// DRAW BRICKS
function    drawBricks()    {
    for(let c   =   0;  c   <   columnCount;    c++){
        for(let r   =   0;  r   <   rowCount;   r++){
            if(bricks[c][r].status  === 1){
                let brickX  =   (c  *   (brickWidth +   brickPadding))  +   leftOffset;
                let brickY  =   (r  *   (brickHeight    +brickPadding)) +   topOffset;
                bricks[c][r].x  =   brickX;7
                bricks[c][r].y  =   brickY;
                ctx.beginPath();
                ctx.roundRect(brickX,   brickY, brickWidth, brickHeight,    30);
                ctx.fillStyle   =   '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// TRACK    SCORE
function    trackScore(){
    ctx.font    =   'bold 16px san-serif';
    ctx.fillStyle   =   '#333'
    ctx.fillText('Score : ' +   score,  8,  24);
}

// CHECK    BALL    HIT BRICKS
function    hitDetection(){
    for (let    c   =   0;  c   <   columnCount;    c++){
        for(let r   =   0;  r   <   rowCount;   r++){
            let b   =   bricks[c][r];
            if(b.status === 1){
                if(x    >   b.x && x    <   b.x +   brickWidth  &&  y   >   b.y &&  y   <   b.y +   brickHeight){
                    dy  =   -dy;
                    b.status    =   0;
                    score++;
                    // CHECK    WIN
                    if(score    === rowCount    *   columnCount){
                        alert('Tu ganaste!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// MAIN FUNCTION
function    init(){
    ctx.clearRect(0,    0,  canvas.width,   canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // DETECT   LEFT AND RIGHT WALL
    if(x    +   dx  >   canvas.width    -ballRadius ||  x   +   dx  <   ballRadius){
        dx  =   -dx;
    }

    // DETECT TOP WALL
    if(y    +   dy  <   ballRadius){
        dy  =   -dy;
    }else   if( y   +   dy  >   canvas.height   -   ballRadius){
        // DETECT PADDLE HITS
        if( x   >   paddleX &&  x   <   paddleX +   paddleWidth){
            dy  =   -dy;
        }else{
            // IF   BALL    DON'T   HIT PADDLE
            alert('Game Over!');
            document.location.reload();
        }
    }

    // BOTTOM WALL
    if( y   +   dy  <   canvas.height   -ballRadius ||  y   +   dy  <   ballRadius){
        dy   =   -dy;
    }

    // MOVE BALL
    x   +=  dx;
    y   +=  dy;
}

setInterval(init,   10);
// GET DOM  ELEMENTS    NEEDED  FOR GAME
const   scoreEL =   document.getElementById("score");
const   colorParts  =   document.querySelectorAll(".colors");
const   containerEl =   document.querySelector(".container");
const   startBtn =   document.querySelector("#start-btn");
const   resultEl =   document.querySelector("#score-result");
const   wrapperEl =   document.querySelector(".wrapper");

// CURRENT  AND NEW COLORS  OBJECT
const   colorObj    =   {
    color1: {   current:    "#006400",  new:    "#00ff00"},
    color2: {   current:    "#800000",  new:    "#ff0000"},
    color3: {   current:    "#0000b8",  new:    "#0000ff"},
    color4: {   current:    "#808000",  new:    "#ffff00"},
};

// GAME VARIABLES
let randomColors    =   [];
let isPathGenerating    =   false;
let score   =   0;
let clickCount  =   0;

// FUNCTION TO  GET A   RANDOM  COLOR   FROM    COLORS  OBJECT
const   getRandomColor  =   (colorObj) =>  {
    const   colorKeys  =   Object.keys(colorObj);
    return  colorKeys[Math.floor(Math.random()  *   colorKeys.length)];
};

// FUNCTION TO  PAUSE   EXECUTION   OF  GAME    FOR GIVEN   AMOUNT  OF  TIME
const   delay   =   async   (time)  =>{
    return  await   new Promise((resolve)   =>  setTimeout(resolve, time));
};

// FUNCTION TO  GENERATE    A RANDOM PATH OF COLORS

const   generateRandomPath  =   async   ()  =>{
    randomColors.push(getRandomColor(colorObj));
    score   =   randomColors.length;
    isPathGenerating    =   true;
    await   showPath(randomColors);
}

// FUNCTION TO  SHOW    THE PATH    OF  COLORS  TO  PLAYER

const   showPath    =   async   (colors)    =>{
    scoreEL.innerText   =   score;
    // LOOP THROUGH EACH    COLOR   IN  THE ARRAY
    for(let color   of  colors){
        const   currentColor    =   document.querySelector(`.${color}`);
        // PAUSE    EXECUTION   FOR 500 MILISECONDS
        await   delay(90);
        // SET  BACKGROUND  TO  NEW COLOR
        currentColor.style.backgroundColor   =   colorObj[color].new;
        await   delay(500);
        // SET  BACKGROUND  TO  OLD COLOR
        currentColor.style.backgroundColor  =   colorObj[color].current;
        await   delay(500);
    }
    // SET  FLAG    TO  INDICATE    THE GAME    IS  NO  LONGER  GENERATING  PATH
    isPathGenerating    =   false;
};

// FUNCTION TO  END THE GAME    AND SHOW    FINAL   SCORE
const   endGame =   ()  =>{
    resultEl.innerHTML  =   `<span> Your    Score   :</span>    ${score}`;
    resultEl.classList.remove("hide");
    containerEl.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startBtn.innerText  =   "Play   Again";
    startBtn.classList.remove("hide");
};

// FUNCTION TO  RESET   GAME    AFTER   ENDING

const   resetGame   =   ()  =>{
    score   =   0;
    clickCount  =   0;
    randomColors    =   [];
    isPathGenerating    =   false;
    wrapperEl.classList.remove("hide");
    containerEl.classList.add("hide");
    generateRandomPath();
};

// FUNCTION TO  HANDLE  A   COLOR   BEING   CLICKED
const   handleColorClick    =   async   (e) =>{
    // IF   THE PATH    IS  CURRENTLY   BEING   GENERATED,  IGNORE  CLICK
    if(isPathGenerating){
        return  false;
    }
    // IF   CLICK   COLOR   IS  CORRECT,    UPDATE  SCORE   AND CONTINUE    GENERATING  THE PATH
    if(e.target.classList.contains(randomColors[clickCount])){
        e.target.style.backgroundColor  =   colorObj[randomColors[clickCount]].new;
        await   delay(500);
        e.target.style.backgroundColor  =   colorObj[randomColors[clickCount]].current;
        clickCount++;
        if(clickCount   === score){
            clickCount  =   0;
            generateRandomPath();
        }
        // IF   CLICKED COLOR   IF  INCORRECT,  END GAME
    }else{
        endGame();
    }
};

// EVENT    LISTENERS
startBtn.addEventListener("click",  resetGame);
colorParts.forEach((color)  =>  color.addEventListener("click", handleColorClick));
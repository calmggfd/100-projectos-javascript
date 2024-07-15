// Random  Quotes  Api
const   quoteApiUrl =   "https://api.quotable.io/random?minLength=80&maxLength=100"
const   quoteSection    =   document.getElementById("quote");
const   userInput   =   document.getElementById("quote-input");

let quote   =   "";
let time    =   60;
let timer   =   "";
let mistakes    =   0;

// Display Random  Quotes
const   renderNewQuote  =   async   ()  =>{
    // Fetch   Content From    Quote   Api Url
    const   response    =   await   fetch(quoteApiUrl);
    let data    =    await  response.json();
    quote   =   data.content;

    // Array   Of  Chars   in  Quote
    let arr =   quote.split("").map((value) =>  {
        return  "<span  class='quote-chars'>"   +   value   +   "</span>";
    });
    quoteSection.innerHTML  =  arr.join("");
};

// Logic   To  Compare Input   Word    Width   Quote
userInput.addEventListener("input", ()  =>  {
    let quoteChars  =   document.querySelectorAll(".quote-chars");
    quoteChars  =   Array.from(quoteChars);

    //Array Of  User    Input   Chars
    let userInputChars  =   userInput.value.split("");
    // Loop Through Each    Char    In  Quote
    quoteChars.forEach((char,   index)  =>{
        // Check    Chars   Width   Quote   Chars
        if(char.innerText   ==  userInputChars[index]){
            char.classList.add("success");
        }
        // If User  Hasn't  Entered Anything    Or  Backspaced
        else    if(userInputChars[index]    ==  null){
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }   else    {
                char.classList.remove("fail");
            }
        }
        // If   User    Entered Wrong   Char
        else{
            if(!char.classList.contains("fail")){
                // Increment    And Displaying  Mistakes
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText   =   mistakes;
        }

            // Return   True    If  All Chars   Are Correct
            let check   =   quoteChars.every((element)  =>{
                return  element.classList.contains("success");
        });

        // End  Test    If  All Chars   Are Correct
        if(check){
            displayResult();
        }

    });

});

// Update   Timer
function    updateTimer(){
    if(time ==  0){
        // End  Test    If  Reaches 0
        displayResult();
    }else{
        document.getElementById("timer").innerText  =   --time  +   "s";
    }
}

// Set  Timer
const   timeReduce  =   ()  =>  {
    time    =   60;
    timer   =   setInterval(updateTimer,    1000);
};

//End   test
const   displayResult   =   ()  =>{
    // Display  result  div
    document.querySelector(".result").style.display =   "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display  =   "none";
    userInput.disabled  =   true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText    =   (userInput.value.length /   5   /   timeTaken).toFixed(2)   +   "wpm";
    document.getElementById("accuracy").innerText   =   Math.round(((userInput.value.length -   mistakes)   /   userInput.value.length) *   100)    +   "%";
};

// Start    Test
const   startTest   =   ()  =>{
    mistakes    =   0;
    timer   =   "";
    userInput.disabled  =   false;
    timeReduce();
    document.getElementById("start-test").style.display =   "none";
    document.getElementById("stop-test").style.display =   "block";
};

window.onload   =   ()  =>{
    userInput.value =   "";
    document.getElementById("start-test").style.display =   "block";
    document.getElementById("stop-test").style.display =   "none";
    userInput.disabled  =   true;
    renderNewQuote();
}
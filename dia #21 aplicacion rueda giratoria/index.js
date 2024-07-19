const   wheel   =   document.getElementById("wheel"),
    spinBtn =   document.getElementById("spin-btn"),
    finalValue  =   document.getElementById("final-value");

// VALUE    OF  MIN AND MAX ANGLE   FOR A   VALUE

const   rotationValues   =   [
    {   minDregree: 0,  maxDegree:  30, value:  2},
    {   minDregree: 31,  maxDegree:  90, value:  1},
    {   minDregree: 91,  maxDegree:  150, value:  6},
    {   minDregree: 151,  maxDegree:  210, value:  5},
    {   minDregree: 211,  maxDegree:  270, value:  4},
    {   minDregree: 271,  maxDegree:  330, value:  3},
    {   minDregree: 331,  maxDegree:  360, value:  2},
];

// SIZE OF  PIECES
const   data    =   [16,    16, 16,    16,  16,    16,];

// BACKGROUND   COLOR   OF  PIECES

var pieColors   =   [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
];

// WE   USE PIE CHART   FOR WHEEL,  SO  LET'S   CREATE  IT
let myChart =   new Chart(wheel,    {
    // DISPLAY  TEXT    ON  PIE CHART
    plugins:    [ChartDataLabels],
    type:   "pie",
    data:   {
        // VALUES   ON  CHART
        labels: [1, 2,  3,  4,  5,  6],
        datasets:   [
            {
                backgroundColor:    pieColors,
                data:   data,
            },
        ],
    },
    options:    {
        // RESPONSIVE   CHART   DESIGN
        responsive: true,
        animation:  {   duration:   0},
        plugins:    {
            tooltip:    false,
            legend: {
                display:    false,
            },
            // SHOW LABELS  INSIDE  OF  PIE CHART
            datalabels: {
                color:  "#ffffff",
                formatter:  (_, context )   =>  context.chart.data.labels[context.dataIndex],
                font:   {size:  24},
            },
        },
    },
});

// DISPLAY  VALUE   BASED   ON  RANDOMANGLE

const   valueGenerator  =   (angleValue)    =>  {
    for (let    i   of  rotationValues) {
        if  (angleValue >=  i.minDregree    &&  angleValue  <=  i.maxDegree)    {
            finalValue.innerHTML    =   `<p>Value:  ${i.value}</p>`;
            spinBtn.disabled    =   false;
            break;
        }
    }
};

// SPINNER COUNT

let count   =   0;
// 100  ROTATION    FOR ANIMATION   AND LAST    FOR RESULT
let resultValue =   101;
// START    SPINNING
spinBtn.addEventListener("click",   ()  =>  {
    spinBtn.disabled    =   true;
    finalValue.innerHTML    =   `<p>Good Luck!</p>`;
    // GENERATE    RANDOM   DEGREE  TO  STOP    AT
    let randomDegree    =   Math.floor(Math.random()    *   (355    -   0   +   1)  +   0);
    // INTERVAL    FOR  ROTATION    ANIMATION
    let rotationInterval    =   window.setInterval(()   =>  {
        myChart.options.rotation    =   myChart.options.rotation    +   resultValue;
        myChart.update();
        // IF   ROTATION    >   360 RESET   IT  BACK    TO  0
        if  (myChart.options.rotation   >=  360)    {
            count   +=  1;
            resultValue -=  5;
            myChart.options.rotation    =   0;
        }   else    if  (count  >   15  &&  myChart.options.rotation    ==  randomDegree)   {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count   =   0;
            resultValue =   101;
        }
    },  10);
});
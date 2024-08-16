const symbolInput   =   document.querySelector('#symbol');
const stockList =   document.querySelector('#stock-list');

// FUNCTION TO FETCH AND DISPLAY THE TOP 10 STOCKS
function    fetchTopStocks(){
    // FETCH DATA FROM API https://www.alphavantage.co/
    fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=DTZTE0NTMD1KVE4S').then(response    =>  response.json()).then(data  =>  {
        const stocks = data['Rank A: Real-Time Performance'];
        let html    =   '';
        // LOOP THROUGH  THE STOCKS AND GENERATE HTML FOR EACH STOCK
        for(let i   =   0;i <   10; i++){
            const symbol = Object.keys(stocks)[i];
            const change    =   stocks[symbol];
            const changeColor   =   parseFloat(change)  >=  0   ?   'green' :   'red';
            html    +=  `
                <li>
                    <span class="symbol">${symbol}</span>
                    <span class="change"    style="color: ${changeColor}">${change}</span>
                </li>
            `;
        }

        // UPDATE STOCK LIST CONTAINER
        stockList.innerHTML =   html;   
    }).catch(error  =>  console.error(error));
}

// FUNCTION TO FETCH AND DISPLAY  STOCK DATA FOR THE SEARCHED SYMBOL
function fetchStockData(symbol){
    // IF INPUT WAS EMPTY DISPLA TOP 10 STOCKS
    if(!symbol){
        fetchTopStocks();
        return;
    }

    // FETCH THE STOCK DATA FOR THE PROVIDED SYMBOL FROM API
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=DTZTE0NTMD1KVE4S`).then(response =>  response.json()).then(data  =>{
        const quote =   data['Global Quote'];
        if(quote && quote['10. change percent']){
            const changePercent =   quote['10. change percent'].replace('%',    '');
            const changeColor   =   parseFloat(changePercent)  >=  0   ?   'green' :   'red';
            const html  =   `<li>
                    <span class="symbol">${symbol}</span>
                    <span class="change"    style="color: ${changeColor}">${changePercent}</span>
                </li>
                `;
                stockList.innerHTML =   html;
        }else{
            stockList.innerHTML =   '<li class="error">Invalid Symbol</li>';
        }
    }).catch(error  => console.error(error));
}

// DISPLAY TO 10 ON PAGE LOAD
fetchTopStocks();

// HANDLE FROM SUBMISSION
document.querySelector('form').addEventListener('submit',   (e) =>{
    e.preventDefault();

    // GET  SYMBOL ENTER BY USER AND CONVERTER IT TO UPPERCASE
    const symbol    =   symbolInput.value.toUpperCase();
    fetchStockData(symbol);
});
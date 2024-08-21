const apiKey    =   "0800cbc1478f747ae61a123ddcd71f7b";
const imgApi    =   "https://image.tmdb.org/t/p/w1280";
const   searchUrl   =   `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const form  =   document.getElementById("search-form");
const query =   document.getElementById("search-input");
const result    =   document.getElementById("result");

let page =  1;
let isSearching =   false;

// FETCH JSON DATA FROM URL
async   function    fetchData(url){
    try{
        const response  =   await   fetch(url);
        if(!response.ok){
            throw   new Error("Network response was not ok");
        }
        return await   response.json();
    }catch  (error){
        return  null;
    }
}

// FETCH AND SHOW RESULT BASED ON URL
async   function    fetchAndShowResult(url) {
    const data  =   await   fetchData(url);
    if(data &&  data.results){
        showResults(data.results);
    }
}

function createMovieCard(movie){
    const { posterPath, originalTitle,  releaseDate,    overview    }   =   movie;
    const imagePath =   posterPath  ?   imgApi  +   posterPath  :   "./img-01.jpeg";
    const truncatedTitle    =   originalTitle.length    >   15  ?   originalTitle.slice(0,  15) +   "..."   :   originalTitle;
    const formattedDate =   releaseDate ||  "No Release date";
    const cardTemplate  =   `
        <div class="column">
        <div class="card">
            <a class="card-media" href="./img-01.jpeg">
                <img src="${imagePath}" alt="${originalTitle}" width="100%" />
            </a>
            <div class="card-content">
                <div class="card-header">
                    <div class="left-content">
                        <h3 style="font-weight: 600">${truncatedTitle}</h3>
                        <span style="color: #12efec">${formattedDate}</span>
                    </div>
                    <div class="right-content">
                        <a href="${imagePath}" target="_blank" class="card-btn">See cover</a>
                    </div>
                </div>
                <div class="info">
                    ${overview || "No overview yet..."}
                </div>
            </div>
        </div>
    </div>
    `;
    return  cardTemplate;
}

// CLEAR RESULT ELEMENTS FOR SEARCH
function    clearResults(){
    result.innerHTML    =   "";
}

// SHOW RESULTS IN PAGE
function    showResults(item){
    const newContent    =   item.map(createMovieCard).join("");
    result.innerHTML    =   newContent  ||  "<p>No results found</p>";
}

// LOAD MORE RESULTS
async   function    loadMoreResults(){
    if(isSearching){
        return;
    }
    page++;
    const searchTerm    =   query.value;
    const url   =   searchTerm  ?   `${searchUrl}${searchTerm}&page=${page}`    :   `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_key=${apiKey}&page=${page}`;
    await   fetchAndShowResult(url);
}

// DETECT EN OF PAGE ON LOAD MORE RESULTS
// function    detectEnd(){
//     const { scrollTop,   clientHeight,    scrollHeight}   =   document.documentElement;
//     if(scrollTop    +   clientHeight    >=  scrollHeight    -   20){
//         loadMoreResults();
//     }
// }

function    detectEnd(){
    const { scrollTop,  clientHeight,   scrollHeight }  =   document.documentElement;
    if(scrollTop    +   clientHeight    >=  scrollHeight    -   20){
        loadMoreResults();
    }
}


// HANDLE SEARCH
// async function handleSearch(e){
//     e.preventDefault();
//     const searchTerm    =   query.value.trim();
//     if(searchTerm){
//         isSearching =   true;
//         clearResults();
//         const newUrl    =   `${searchUrl}${searchTerm}&page=${page}`;
//         await   fetchAndShowResult(newUrl);
//         query.value =   "";
//     }
// }

async function   handleSearch(e){
    e.preventDefault();
    const searchTerm    =   query.value.trim();
    if(searchTerm){
        isSearching =   true;
        clearResults();
        const newUrl    =   `${searchUrl}${searchTerm}&page=${page}`;
        await   fetchAndShowResult(newUrl);
        query.value =   "";
    }
}


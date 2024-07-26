const resultContainer   =   document.getElementById("result");
const   searchBtn   =   document.getElementById("search-button");
const   searchInput =   document.getElementById("search-input");
const   searchContainer =   document.querySelector("search-box");

// API URL TO FETCH MEAL DATA
const apiUrl    =   "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// EVENT    LISTENER    FOR SEARCH  AND INPUT   (WHEN   PRESS   ENTER)
searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", function    (e){
    if(e.keyCode    === 13){
        e.preventDefault();
        searchMeal();
    }
});

// HANDLE   MEAL    FUNCTION
function    searchMeal(){
    const   userInput   =   searchInput.value.trim();
    if(!userInput){
        resultContainer.innerHTML   =   `<h3>Input Field Cannot Be  Empty</h3>`;
        return;
    }
    // FETCH    MEAL DATA USING API WITH USER INPUT
    fetch(apiUrl    +   userInput).then((response)  =>  response.json()).then((data)    =>  {
        const   meal    =   data.meals[0];
        // HANDLE   WEAR NO MEAL FOUND
        if (!meal)  {
            resultContainer.innerHTML   =   `<h3>No meal found, Please Try Again!</h3>`;
            return;
        }
        const   ingredients =   getIngredients(meal);
        // GENERATE HTML TO DISPLAY MEAL DATA
        const recipeHtml    =   `
            <div    class="details">
                <h2>${meal.strMeal}</h2>
                <h4>${meal.strArea}</h4>
            </div>
            <img    src=${meal.strMealThumb}    alt=${meal.strMeal} />
            <div    id="ingre-container">
                <h3>Ingredients:</h3>
                <ul>${ingredients}</ul>
            </div>
            <div    id="recipe">
                <button id="hide-recipe">X</button>
                <pre    id="instructions">${meal.strInstructions}</pre>
            </div>
            <button id="show-recipe">View Recipe</button>
        `;
        resultContainer.innerHTML   =   recipeHtml;

        const   hideRecipeBtn   =   document.getElementById("hide-recipe");
        const   showRecipeBtn   =   document.getElementById("show-recipe");
        showRecipeBtn.addEventListener("click", showRecipe);
        searchContainer.style.opacity   =   '0';
        searchContainer.style.display   =   'none';
    })
    // HANDLE   ERROR
    .catch(()   =>{
        searchContainer.style.opacity   =   '1';
        searchContainer.style.display   =   'grid';
        searchContainer.innerHTML   =   `<h3>Error  fetching data!</h3>`;
    });
}

// GENERATE HTML    FOR LIST OF INGREDIENTS
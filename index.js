const searchResultContainer = document.getElementById("searchResultContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");



function createAndAppendSearchResult(result) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    let { strMealThumb, strMeal, strCategory, strArea, strInstructions } = result;

    let thumbnailImg = document.createElement("img");
    thumbnailImg.src = strMealThumb;
    recipeCard.appendChild(thumbnailImg);

    let descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("recipe-description");

    let mealHeading = document.createElement("h1");
    mealHeading.textContent = strMeal;
    descriptionContainer.appendChild(mealHeading);

    let tagContainer = document.createElement("div");
    tagContainer.classList.add("recipe-description-tag");

    let categoryTag = document.createElement("p");
    categoryTag.textContent = strCategory;
    tagContainer.appendChild(categoryTag);

    let categoryArea = document.createElement("p");
    categoryArea.textContent = strArea;
    tagContainer.appendChild(categoryArea);

    let instructions = document.createElement("p");
    instructions.textContent = strInstructions;
    descriptionContainer.appendChild(instructions);

    let moreInfoBtn = document.createElement("button");
    moreInfoBtn.textContent = "More Info";
    descriptionContainer.appendChild(moreInfoBtn);

    recipeCard.appendChild(descriptionContainer);

    searchResultContainer.appendChild(recipeCard);
}

function displayResults(searchResults) {
    for (let result of searchResults){
        createAndAppendSearchResult(result);
    }
}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    searchResultContainer.textContent = "";
    const searchInputVal = searchInput.value;
    console.log(searchInputVal);

    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInputVal;
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            console.log(jsonData);
            let { meals } = jsonData;
            displayResults(meals);
        });
});
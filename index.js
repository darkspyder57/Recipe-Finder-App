const searchResultContainer = document.getElementById("searchResultContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const spinner = document.getElementById("spinner");

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

    descriptionContainer.appendChild(tagContainer);

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
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    searchResultContainer.textContent = "";

    const searchInputVal = searchInput.value.trim();
    if (searchInputVal === "") {
        Swal.fire({
            icon: "warning",
            title: "Empty Search",
            text: "Please enter a meal name to search.",
        });
        return;
    }

    spinner.style.display = "block"; // Show spinner

    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInputVal;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            spinner.style.display = "none"; // Hide spinner
            let { meals } = jsonData;

            if (!meals) {
                searchResultContainer.textContent = "";
                Swal.fire({
                    icon: "info",
                    title: "No Results Found",
                    text: `No meals matched "${searchInputVal}". Try something else.`,
                });
                return;
            }

            displayResults(meals);
        })
        .catch(function (error) {
            spinner.style.display = "none"; // Hide spinner on error
            console.error("Error fetching data:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please try again later.",
            });
        });
});

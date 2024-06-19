
let searchInputEl = document.querySelector('.search-input');
let searchBtnEl = document.querySelector('#search-btn');
let resultAreaEl = document.querySelector('.result-area');

// Event listener
searchBtnEl.addEventListener('click', getRecipes);

function getRecipes() {
  let searchTerm = searchInputEl.value.trim();
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  // Fetch data and handle response
  fetch(apiUrl)
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
      displayRecipes(data); // Call function to process data
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
      resultAreaEl.innerHTML = "An error occurred while fetching recipes."; // Inform user
    });
}

function displayRecipes(recipes) {
  resultAreaEl.innerHTML = ""; // Clear existing content
  if (recipes) {
    if (!recipes.meals) {
      resultAreaEl.innerHTML = "No recipes found for your search term.";
      return;
    }

    recipes.meals.forEach(recipe => {
      resultAreaEl.innerHTML += `
        <div class="card">
          <div class="card-img">
            <img src="${recipe.strMealThumb}" alt=""> 
          </div>
          <div class="card-info">
            <h2>${recipe.strMeal}</h2>  
            <br>
            <a href="#" onclick="test(id)">Get Recipe</a>
          </div>
        </div>
       
      `;
    });
  } else {
    // Handle case where recipes object is null (e.g., API call failed)
    console.error("Error fetching recipes");
  }
};

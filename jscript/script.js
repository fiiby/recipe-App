
let searchInputEl = document.querySelector('.search-input');
let searchBtnEl = document.querySelector('#search-btn');
let resultArea = document.querySelector('.result-area');

// Event listener
searchBtnEl.addEventListener('click', getRecipes);

function getRecipes() {
  let searchTerm = searchInputEl.value.trim();
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood${searchTerm}`;

  // Fetch data and handle response
  fetch(apiUrl)
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
      displayRecipes(data); // Call function to process data
    })
    .catch(error => {
      console.error(error); // Handle errors
    });
}

function displayRecipes(recipes) {
  if (!recipes.meals) {
    resultArea.innerHTML = "No recipes found for your search term.";
    return;
  }

  resultArea.innerHTML = ""; // Clear existing content

  recipes.meals.forEach(recipe => {
    resultArea.innerHTML += `
      <div class="card">
        <div class="card-img">
          <img src="${recipe.strMealThumb}" alt="">
        </div>
  
        <div class="card-info">
          <h2>${recipe.strMeal}</h2>
          <br>
          <a href="recipe-details">Get Recipe</a>
        </div>
      </div>
      `;
  });
};

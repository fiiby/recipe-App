// www.themealdb.com/api/json/v1/1/lookup.php?i={id}

let searchInputEl = document.querySelector('.search-input');
let searchBtnEl = document.querySelector('#search-btn');
let resultAreaEl = document.querySelector('.result-area');
let recipeDetails = document.querySelector('.recipe-details');

// Event listener
searchBtnEl.addEventListener('click', getRecipes);
resultAreaEl.addEventListener('click',getRecipeDetails);
recipeDetails.addEventListener('click',closeRecipeDetails);

function getRecipes() {
  let searchTerm = searchInputEl.value.trim();
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`; // this is correct url as it reject the filter one!

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
            <a href="#" class= "recipe-btn" data-id=${recipe.idMeal}>Get Recipe</a>
          </div>
        </div>
       
      `;
    });
  } else {
    // Handle case where recipes object is null (e.g., API call failed)
    console.error("Error fetching recipes");
  }
};

function getRecipeDetails(e) {
  if(e.target.classList.contains('recipe-btn')) {
    let id =e.target.getAttribute('data-id');
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

 // Fetch data and handle response
  fetch(apiUrl)
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
    displayRecipeDetails(data); // Call function to process data
  })
  .catch(error => {
    console.error("Error fetching recipes:", error);
    resultAreaEl.innerHTML = "An error occurred while fetching recipes."; // Inform user
  });
}
  }
function displayRecipeDetails(recipeItem) {
 let item = recipeItem.meals[0];
 recipeDetails.classList.remove('showDetails');
  console.log(item);

  recipeDetails.innerHTML = ""; //the empty string to clear existing content

  recipeDetails.innerHTML =`
  <i  class="fa fa-times" aria-hidden="true"></i>
  <h2>${item.strMeal}</h2>
  <p>Instructions: </p>
  <p>${item.strInstructions}</p>
  <a href="${item.strYoutube}">watch video</a>
  `
}
function closeRecipeDetails(e) {
  if(e.target.classList.contains('fa-times')) {
    e.target.parentElement.classList.add('showDetails');
  };

}
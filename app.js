const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        });
});

const createMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }
    
    const newInnerHTML = `
		<div>
            <div>
                <div class="row">
                    <img class="col-md-5" class="imgS" src="${meal.strMealThumb}" alt="Meal Image">
                    <div class="col-md-7">
                        <h4>${meal.strMeal}</h4>
                        <p>${meal.strInstructions}</p>
                    </div>
                </div>
                <div class="row p-3">
                <div class="col-md-5 p-5 cate mr-5">
                    ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                    ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                    ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                </div>
                <div class="col-md-6 p-5 list">
                  <h5>Ingredients:</h5>
                    <ul>
                        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>                
                </div>
			</div>
			
		</div>
		${meal.strYoutube ? `
		<div class="row ">
			<h5 class="col-md-5 recipe">Video Recipe</h5>
			<div class="col-md-7">
                <iframe class="video"
				    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;

    meal_container.innerHTML = newInnerHTML;
}
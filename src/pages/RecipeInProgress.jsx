import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import fetchFoodOrDrink from '../services/id';
import { INGREDIENTS_QUANTITY } from '../constants/constants';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

function RecipeInProgress({
  location: { pathname },
  match: {
    params: { id },
  },
}) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDetails = await fetchFoodOrDrink(pathname, id);
      setRecipe(recipeDetails[0]);
    };
    getRecipe();
  }, [id, pathname]);

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      const ingredientsList = INGREDIENTS_QUANTITY.map((number) => (
        `${recipe[`strMeasure${number}`] || ''} ${
          recipe[`strIngredient${number}`] || ''
        }`.trim()
      ));
      setIngredients(ingredientsList.filter((ing) => ing !== ''));
    }
  }, [recipe]);

  const {
    strMeal,
    strDrink,
    strAlcoholic,
    strCategory,
    strInstructions,
    strMealThumb,
    strDrinkThumb,
  } = recipe;

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        width="100%"
      />
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      <FavoriteButton />
      <ShareButton />
      <h2 data-testid="recipe-category">{strCategory}</h2>
      {strAlcoholic && <h3>{strAlcoholic}</h3>}
      <ul>
        {ingredients.map((ing, index) => (
          <li key={ `${ing}${index}` } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ ing }>
              <input id={ ing } type="checkbox" />
              {ing}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <button data-testid="finish-recipe-btn" type="button">
        Finish Recipe
      </button>
    </main>
  );
}

RecipeInProgress.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;

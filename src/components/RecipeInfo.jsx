import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import { INGREDIENTS_QUANTITY } from '../constants/constants';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function RecipeInfo({ recipe, handleCheckbox, doneSteps }) {
  const [ingredients, setIngredients] = useState([]);
  const {
    strMeal,
    strDrink,
    strAlcoholic,
    strCategory,
    strInstructions,
    strMealThumb,
    strDrinkThumb,
  } = recipe;

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      INGREDIENTS_QUANTITY.forEach((number) => {
        const text = `${recipe[`strMeasure${number}`] || ''} ${
          recipe[`strIngredient${number}`] || ''
        }`.trim();
        if (text !== '') {
          setIngredients((prev) => [...prev, { number, text }]);
        }
      });
    }
  }, [recipe]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        width="360px"
      />
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      <FavoriteButton />
      <ShareButton />
      <h2 data-testid="recipe-category">{strCategory}</h2>
      {strAlcoholic && <h3>{strAlcoholic}</h3>}
      <ul>
        {ingredients.map(({ number, text }, index) => (
          <li key={ `${number}${text}` } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ number }>
              <input
                id={ number }
                type="checkbox"
                onChange={ handleCheckbox }
                checked={ doneSteps.includes(number.toString()) }
              />
              {text}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <button data-testid="finish-recipe-btn" type="button">
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInfo.propTypes = {
  recipe: PropType.shape({
    strMeal: PropType.string,
    strDrink: PropType.string,
    strAlcoholic: PropType.string,
    strCategory: PropType.string,
    strInstructions: PropType.string,
    strMealThumb: PropType.string,
    strDrinkThumb: PropType.string,
  }).isRequired,
  handleCheckbox: PropType.func.isRequired,
  doneSteps: PropType.arrayOf(PropType.string),
};

RecipeInfo.defaultProps = {
  doneSteps: [],
};

export default RecipeInfo;

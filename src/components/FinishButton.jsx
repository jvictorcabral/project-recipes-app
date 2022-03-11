import React from 'react';
import PropType from 'prop-types';

function FinishButton({ recipe, setShouldRedirect, type, disableBtn }) {
  const {
    idMeal,
    idDrink,
    strArea,
    strTags,
    strMeal,
    strDrink,
    strAlcoholic,
    strCategory,
    strMealThumb,
    strDrinkThumb,
  } = recipe;

  const doneRecipe = {
    id: idMeal || idDrink,
    type,
    nationality: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
    doneDate: new Date().toLocaleString(),
    tags: strTags,
  };

  const handleClick = () => {
    if (localStorage.getItem('doneRecipes')) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('doneRecipes')),
          doneRecipe,
        ]),
      );
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    }
    setShouldRedirect(true);
  };

  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ handleClick }
      disabled={ disableBtn }
    >
      Finish Recipe
    </button>
  );
}

FinishButton.propTypes = {
  recipe: PropType.shape({
    idMeal: PropType.string,
    idDrink: PropType.string,
    strArea: PropType.string,
    strTags: PropType.string,
    strMeal: PropType.string,
    strDrink: PropType.string,
    strAlcoholic: PropType.string,
    strCategory: PropType.string,
    strInstructions: PropType.string,
    strMealThumb: PropType.string,
    strDrinkThumb: PropType.string,
  }).isRequired,
  setShouldRedirect: PropType.func.isRequired,
  type: PropType.string.isRequired,
  disableBtn: PropType.bool.isRequired,
};

export default FinishButton;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function StartButtonRecipe({ nameRecipe, idRecipe, history, pathname }) {
  const [disabledBtnStartRecipe, setDisabledBtnStartRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);

  const findRecipeDone = () => {
    if (!localStorage.getItem('doneRecipes')) {
      return localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDisabledBtnStartRecipe(
      doneRecipes.some(({ name }) => name === nameRecipe),
    );
  };

  const findRecipeInProgress = () => {
    if (!localStorage.getItem('inProgressRecipes')) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealOrDrink = pathname.includes('foods') ? 'meals' : 'cocktails';
    const idRecipes = Object.keys(inProgressRecipes[mealOrDrink]);
    setInProgressRecipe(
      idRecipes.some((id) => Number(id) === idRecipe),
    );
  };

  useEffect(() => {
    findRecipeDone();
    findRecipeInProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!disabledBtnStartRecipe && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn__start-recipe"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          {inProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default StartButtonRecipe;

StartButtonRecipe.propTypes = {
  nameRecipe: PropTypes.string,
  idRecipe: PropTypes.string,
  history: PropTypes.string,
  pathname: PropTypes.string,
}.isRequired;

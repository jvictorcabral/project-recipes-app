import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchFoodOrDrink from '../services/id';
import RecipeInfo from '../components/RecipeInfo';
import FinishButton from '../components/FinishButton';

function InProgressRecipe({
  location: { pathname },
  match: {
    params: { id },
  },
}) {
  const [recipe, setRecipe] = useState({});
  const [doneSteps, setDoneSteps] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const key = pathname.includes('foods') ? 'meals' : 'cocktails';
  const { idMeal, idDrink } = recipe;

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }),
      );
    } else {
      const savedProgress = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );
      setDoneSteps(savedProgress[key][id] || []);
    }
  }, [id, key]);

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDetails = await fetchFoodOrDrink(pathname, id);
      setRecipe(recipeDetails[0]);
    };
    getRecipe();
  }, [id, pathname]);

  const handleCheck = ({ target }) => {
    if (target.checked) {
      setDoneSteps((prev) => [...prev, target.id]);
    } else {
      setDoneSteps((prev) => prev.filter((step) => step !== target.id));
    }
  };

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      progress[key] = {
        ...progress[key],
        [idMeal || idDrink]: doneSteps,
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    }
  }, [doneSteps, idDrink, idMeal, key, recipe]);

  return (
    <main>
      {shouldRedirect && <Redirect to="/done-recipes" />}
      <RecipeInfo
        recipe={ recipe }
        handleCheckbox={ handleCheck }
        doneSteps={ doneSteps }
        type={ key }
      />
      <FinishButton
        recipe={ recipe }
        setShouldRedirect={ setShouldRedirect }
        type={ key }
        setDisableBtn={ setDisableBtn }
        url={ window.location.href.replace('/in-progress', '') }
      />
      <button data-testid="finish-recipe-btn" type="button" disabled={ disableBtn }>
        Finish Recipe
      </button>
    </main>
  );
}

InProgressRecipe.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string,
    }),
  }).isRequired,
};

export default InProgressRecipe;

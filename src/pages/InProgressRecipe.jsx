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
  const [ingredients, setIngredients] = useState([]);

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

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      progress[key] = {
        ...progress[key],
        [idMeal || idDrink]: doneSteps,
      };
      if (doneSteps.length === 0) {
        delete progress[key][idMeal || idDrink];
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    }
  }, [doneSteps, idDrink, idMeal, key, recipe]);

  return (
    <main>
      {shouldRedirect && <Redirect to="/done-recipes" />}
      <RecipeInfo
        recipe={ recipe }
        setDoneSteps={ setDoneSteps }
        doneSteps={ doneSteps }
        type={ key }
        url={ window.location.href.replace('/in-progress', '') }
        ingredients={ { ingredients, setIngredients } }
        pathname={ pathname }
      />
      <FinishButton
        recipe={ recipe }
        setShouldRedirect={ setShouldRedirect }
        type={ key }
        doneSteps={ doneSteps }
        ingredients={ ingredients }
      />
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

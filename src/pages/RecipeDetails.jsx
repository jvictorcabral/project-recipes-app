import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import StartButtonRecipe from '../components/StartButtonRecipe';
import CarouselItems from '../components/CarouselItems';
import fetchFoodOrDrink from '../services/id';
import '../styles/RecipeDetails.css';

function RecipeDetails({ match: { params: { id } }, location: { pathname }, history }) {
  const [recipe, setRecipe] = useState({});
  const {
    strYoutube, strMeal, strDrink, strAlcoholic, idMeal, idDrink,
    strCategory, strInstructions, strMealThumb, strDrinkThumb, strArea,
  } = recipe;

  const requestAPI = async () => {
    const recipeAPI = await fetchFoodOrDrink(pathname, id);
    setRecipe(recipeAPI[0]);
  };

  const hasIngredients = (number) => {
    if (
      recipe[`strIngredient${[number]}`] !== ''
      && typeof recipe[`strIngredient${[number]}`] === 'string'
    ) return true;
  };

  useEffect(() => {
    if (!pathname.includes(idMeal || idDrink)) {
      requestAPI();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        width="360px"
      />
      <h1 data-testid="recipe-title">{ strMeal || strDrink }</h1>
      <FavoriteButton
        pathname={ pathname }
        nameRecipe={ strMeal || strDrink }
        idRecipe={ idMeal || idDrink }
        type={ pathname.includes('foods') ? 'food' : 'drink' }
        nationality={ strArea || '' }
        category={ strCategory }
        alcoholicOrNot={ strAlcoholic || '' }
        image={ strMealThumb || strDrinkThumb }
      />
      <ShareButton url={ window.location.href } />
      <h2 data-testid="recipe-category">{ strAlcoholic || strCategory }</h2>
      <ul>
        {/* Array criado com base nesse link https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n */}
        { Array.from({ length: 20 }, (_, i) => i + 1)
          .filter(hasIngredients)
          .map((number) => (
            <li
              key={ number }
              data-testid={ `${number - 1}-ingredient-name-and-measure` }
            >
              {recipe[`strIngredient${[number]}`]}
              {' '}
              {recipe[`strMeasure${[number]}`]}
            </li>
          ))}
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      {strYoutube && (
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          title="video"
        />
      )}
      <CarouselItems
        pathname={ pathname }
      />
      <StartButtonRecipe
        nameRecipe={ strMeal || strDrink }
        idRecipe={ idMeal || idDrink }
        history={ history }
        pathname={ pathname }
      />
    </main>
  );
}
export default RecipeDetails;

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

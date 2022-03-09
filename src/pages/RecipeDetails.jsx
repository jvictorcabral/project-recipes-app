import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import fetchFoodOrDrink from '../services/id';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const [recipe, setRecipe] = useState({});

  const requestAPI = async () => {
    const recipeAPI = await fetchFoodOrDrink(pathname, id);
    setRecipe(recipeAPI[0]);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const hasIngredients = (number) => {
    if (
      recipe[`strIngredient${[number]}`] !== ''
      && typeof recipe[`strIngredient${[number]}`] === 'string'
    ) return true;
  };

  const {
    strYoutube, strMeal, strDrink, strAlcoholic,
    strCategory, strInstructions, strMealThumb, strDrinkThumb,
  } = recipe;
  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        width="360px"
      />
      <h1 data-testid="recipe-title">{ strMeal || strDrink }</h1>
      <FavoriteButton />
      <ShareButton />
      <h2 data-testid="recipe-category">{ strCategory }</h2>
      {strAlcoholic && (
        <h3>{strAlcoholic}</h3>
      )}
      <ul>
        {/* Array criado com base nesse link https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n */}
        { Array.from({ length: 20 }, (_, i) => i + 1)
          .filter(hasIngredients)
          .map((number) => (
            <li
              key={ recipe[`strIngredient${[number]}`] }
              data-testid={ `${number}-ingredient-name-and-measure` }
            >
              {recipe[`strIngredient${[number]}`]}
              {' '}
              {recipe[`strMeasure${[number]}`]}
            </li>
          )) }
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      {strYoutube && (
        <iframe
          src={ strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      )}
      {/* {recipeRecomendation.map((recipe, index) => ( */}
      <div data-testid={ `${'1'}-recomendation-card` }>Recomendação</div>
      {/* ))} */}
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </main>
  );
}
export default RecipeDetails;

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import fetchFoodOrDrink from '../services/id';
import fetchRecipesRecomendations from '../services/recomendations';
import '../styles/RecipeDetails.css';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const [recipe, setRecipe] = useState({});
  const [recipesRecomendation, setrecipesRecomendation] = useState([]);
  const [pathFoodOrDrink, setPathFoodOrDrink] = useState('');
  const [disabledBtnStartRecipe, setDisabledBtnStartRecipe] = useState(false);

  const {
    strYoutube, strMeal, strDrink, strAlcoholic, idMeal, idDrink,
    strCategory, strInstructions, strMealThumb, strDrinkThumb,
  } = recipe;

  const findRecipeDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDisabledBtnStartRecipe(
      doneRecipes.some(({ name }) => name === strMeal || strDrink),
    );
  };

  const findRecipeInProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const idRecipes = Object.keys(inProgressRecipes[pathFoodOrDrink]);
    idRecipes.some((idRecipe) => Number(idRecipe) === idMeal || idDrink);
  };

  const requestAPI = async () => {
    const recipeAPI = await fetchFoodOrDrink(pathname, id);
    setRecipe(recipeAPI[0]);
  };

  const requestRecomendations = async () => {
    const MAX_RECOMENDATION = 6;
    const recomendations = await fetchRecipesRecomendations(pathname);
    setrecipesRecomendation(
      recomendations.filter((a, index) => index < MAX_RECOMENDATION),
    );
  };

  const checkFoodOrDrinkPage = () => {
    const path = pathname.includes('/drinks') ? 'foods' : 'drinks';
    setPathFoodOrDrink(path);
  };

  useEffect(() => {
    if (!pathname.includes(recipe.idMeal || recipe.idDrink)) {
      requestAPI();
      requestRecomendations();
      checkFoodOrDrinkPage();
      findRecipeDone();
      findRecipeInProgress();
    }
  }, [recipe, id]);

  const hasIngredients = (number) => {
    if (
      recipe[`strIngredient${[number]}`] !== ''
      && typeof recipe[`strIngredient${[number]}`] === 'string'
    ) return true;
  };

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
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      )}
      <Carousel>
        {recipesRecomendation
          .map((recomendation, index) => (
            <Carousel.Item
              key={ recomendation.idMeal || recomendation.idDrink }
            >
              <Link
                to={
                  `/${pathFoodOrDrink}/${recomendation.idMeal || recomendation.idDrink}`
                }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  src={ recomendation.strMealThumb || recomendation.strDrinkThumb }
                  alt={ recomendation.strMeal || recomendation.strDrink }
                  style={ { width: '40%' } }
                />
                <h2
                  data-testid={ `${index}-recomendation-title` }
                >
                  {recomendation.strMeal || recomendation.strDrink}
                </h2>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
      {!disabledBtnStartRecipe && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn__start-recipe"
        >
          Iniciar Receita
        </button>
      )}
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

import React, { useEffect, useState } from 'react';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import fetchFoodOrDrink from '../services/id';

function RecipeDetails({ math: { params: { id } }, location: { pathname } }) {
  const [recipe, setRecipe] = useState({});

  const requestAPI = async () => {
    const recipeAPI = await fetchFoodOrDrink(pathname, id);
    setRecipe(recipeAPI);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <main>
    <img data-testid="recipe-photo" src={  } />
      <h1 data-testid="recipe-title">{  }</h1>
      <FavoriteButton />
      <ShareButton />
      <h2 data-testid="recipe-category">{  }</h2>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`}>
            {ingredient}
          </li>
        )) }
      </ul>
      <p data-testid="instructions">{  }</p>
      <video width="320" height="240" autoplay>
        <source src={  } type="video"/>
        Your browser does not support the video tag.
      </video>
      {recipeRecomendation.map((recipe, index) => (
        <div data-testid={`${index}-recomendation-card`}>{recipe}</div>
      ))}
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

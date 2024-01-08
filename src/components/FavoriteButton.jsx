import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, pathname }) {
  const {
    strMeal,
    strDrink,
    idMeal,
    idDrink,
    strArea,
    strCategory,
    strAlcoholic,
    strMealThumb,
    strDrinkThumb,
  } = recipe;
  const nameRecipe = strMeal || strDrink;
  const idRecipe = idMeal || idDrink;

  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavoriteRecipe = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(
      favoritesRecipes.some(({ name, id }) => name === nameRecipe && id === idRecipe),
    );
  };

  useEffect(() => {
    checkFavoriteRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, idRecipe]);

  const addFavoriteRecipe = (favoritesRecipes) => {
    const recipesAtt = [...favoritesRecipes, {
      id: idRecipe,
      type: pathname.includes('foods') ? 'food' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: nameRecipe,
      image: strMealThumb || strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipesAtt));
  };

  const removeFavoriteRecipe = (favoritesRecipes) => {
    const recipesAtt = favoritesRecipes.filter(
      ({ name, id }) => name !== nameRecipe && id !== idRecipe,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipesAtt));
  };

  const removeOrAddFavoriteRecipe = () => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (isFavorite) {
      removeFavoriteRecipe(favoritesRecipes);
      return checkFavoriteRecipe();
    }
    addFavoriteRecipe(favoritesRecipes);
    checkFavoriteRecipe();
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      className="favorite-btn"
      onClick={ removeOrAddFavoriteRecipe }
      src={
        isFavorite ? blackHeartIcon : whiteHeartIcon
      }
    >
      {isFavorite
        ? <img src={ blackHeartIcon } alt="blackHeartIcon" />
        : <img src={ whiteHeartIcon } alt="whiteHeartIcon" />}
    </button>
  );
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  pathname: PropTypes.string,
}.isRequired;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({
  nameRecipe, idRecipe, type, nationality, category, alcoholicOrNot, image, pathname,
}) {
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
      type,
      nationality,
      category,
      alcoholicOrNot,
      name: nameRecipe,
      image,
    }];
    console.log(recipesAtt);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipesAtt));
  };

  const removeFavoriteRecipe = (favoritesRecipes) => {
    const recipesAtt = favoritesRecipes.filter(
      ({ name, id }) => name !== nameRecipe && id !== idRecipe,
    );
    console.log(recipesAtt);
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
  nameRecipe: PropTypes.string,
  idRecipe: PropTypes.string,
  type: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
}.isRequired;

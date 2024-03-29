import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import StartButtonRecipe from '../components/StartButtonRecipe';
import CarouselItems from '../components/CarouselItems';
import IngredientsQuantity from '../components/IngredientsQuantity';
import fetchFoodOrDrink from '../services/id';
import '../styles/RecipeDetails.css';
import YoutubeVideo from '../components/YoutubeVideo';
import InformationFoodOrDrink from '../components/InformationFoodOrDrink';

function RecipeDetails({ match: { params: { id } }, location: { pathname }, history }) {
  const [recipe, setRecipe] = useState({});
  const {
    strYoutube, strMeal, strDrink, idMeal, idDrink,
  } = recipe;

  const requestAPI = async () => {
    const recipeAPI = await fetchFoodOrDrink(pathname, id);
    setRecipe(recipeAPI[0]);
  };

  useEffect(() => {
    if (!pathname.includes(idMeal || idDrink)) {
      requestAPI();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <section className="recipe-details">
      <InformationFoodOrDrink recipe={ recipe } />
      <IngredientsQuantity recipe={ recipe } />
      <div className="fav_share-btn">
        <FavoriteButton
          pathname={ pathname }
          recipe={ recipe }
        />
        <ShareButton url={ window.location.href } />
      </div>
      {strYoutube && (
        <YoutubeVideo video={ strYoutube } />
      )}
      <StartButtonRecipe
        nameRecipe={ strMeal || strDrink }
        idRecipe={ idMeal || idDrink }
        history={ history }
        pathname={ pathname }
      />
      <CarouselItems
        pathname={ pathname }
      />
    </section>
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

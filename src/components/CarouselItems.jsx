import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import fetchRecipesRecomendations from '../services/recomendations';

function CarouselItems({ pathname }) {
  const [recipesRecomendation, setRecipesRecomendation] = useState([]);

  const requestRecomendations = async () => {
    const MAX_RECOMENDATION = 6;
    const recomendations = await fetchRecipesRecomendations(pathname);
    setRecipesRecomendation(
      recomendations.filter((a, index) => index < MAX_RECOMENDATION),
    );
  };

  useEffect(() => {
    requestRecomendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Carousel>
      {recipesRecomendation
        .map((recomendation, index) => (
          <Carousel.Item
            key={ recomendation.idMeal || recomendation.idDrink }
          >
            <Link
              to={
                `/${
                  pathname.includes('drinks') ? 'foods' : 'drinks'
                }/${
                  recomendation.idMeal || recomendation.idDrink}`
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
  );
}

export default CarouselItems;

CarouselItems.propTypes = {
  pathname: PropTypes.string.isRequired,
};

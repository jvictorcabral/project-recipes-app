import React from 'react';
import PropTypes from 'prop-types';

function InformationFoodOrDrink({ recipe: {
  strMealThumb, strDrinkThumb, strMeal, strDrink,
  strAlcoholic, strCategory, strInstructions,
} }) {
  return (
    <section className="initial-recipe">
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        className="img-recipe"
      />
      <div className="initial-content">
        <h1
          data-testid="recipe-title"
          className="title-recipe"
        >
          { strMeal || strDrink }
        </h1>
        <h2
          data-testid="recipe-category"
          className="type-recipe"
        >
          { strAlcoholic || strCategory }
        </h2>
        <p data-testid="instructions">{ strInstructions }</p>
      </div>
    </section>
  );
}

export default InformationFoodOrDrink;

InformationFoodOrDrink.propTypes = {
  recipe: PropTypes.objectOf({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
}.isRequired;

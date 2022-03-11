import React from 'react';
import PropTypes from 'prop-types';
import { INGREDIENTS_QUANTITY } from '../constants/constants';

function IngredientsQuantity({ recipe }) {
  const hasIngredients = (number) => {
    if (
      recipe[`strIngredient${[number]}`] !== ''
      && typeof recipe[`strIngredient${[number]}`] === 'string'
    ) return true;
  };

  return (
    <ul>
      {/* Array criado com base nesse link https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n */}
      { INGREDIENTS_QUANTITY
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
  );
}

export default IngredientsQuantity;

IngredientsQuantity.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;

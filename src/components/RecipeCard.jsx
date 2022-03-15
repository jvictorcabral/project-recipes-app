import React from 'react';
import PropType from 'prop-types';

function RecipeCard({ index, img, name }) {
  return (
    <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
      <img
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropType.number.isRequired,
  img: PropType.string.isRequired,
  name: PropType.string.isRequired,
};

export default RecipeCard;

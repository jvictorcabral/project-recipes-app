import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

function DoneRecipeCard({
  index,
  img,
  name,
  category,
  doneDate,
  url2,
  tagName,
  nationality,
  alcoholicOrNot,
}) {
  const splitTags = tagName ? tagName.split(',')[0] : tagName;

  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <Link to={ url2 }>
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        <img
          src={ img }
          alt={ name }
          className="done-img"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <h4
        data-testid={ `${index}-${splitTags}-horizontal-tag` }
      >
        {tagName}
      </h4>
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      { alcoholicOrNot && <p>{alcoholicOrNot}</p>}
      { nationality && <p>{nationality}</p>}
      <ShareButton url={ window.location.href } />
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropType.number,
  img: PropType.string,
  name: PropType.string,
  category: PropType.string,
  doneDate: PropType.string,
  url2: PropType.string,
  tagName: PropType.string,
  nationality: PropType.string,
  alcoholicOrNot: PropType.string,
}.isRequired;

export default DoneRecipeCard;

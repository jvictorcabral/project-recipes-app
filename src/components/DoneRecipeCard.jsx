import React, { useState } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({
  index,
  img,
  name,
  category,
  doneDate,
  url,
  url2,
  tagName,
  nationality,
  alcoholicOrNot,
}) {
  const [copyLink, setCopyLink] = useState(false);

  const splitTags = tagName ? tagName.split(',')[0] : tagName;

  const shareRecipe = () => {
    navigator.clipboard.writeText(url);
    setCopyLink(true);
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ url2 }>
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        <img
          src={ img }
          alt={ name }
          style={ { width: '15%' } }
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
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        // onclick criado com ajuda desses links
        // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
        // https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
        onClick={ shareRecipe }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {copyLink && <p>Link copied!</p>}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropType.number,
  img: PropType.string,
  name: PropType.string,
  category: PropType.string,
  doneDate: PropType.string,
  url: PropType.string,
  url2: PropType.string,
  tagName: PropType.string,
  nationality: PropType.string,
  alcoholicOrNot: PropType.string,
}.isRequired;

export default DoneRecipeCard;

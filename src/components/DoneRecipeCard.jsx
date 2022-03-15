import React, { useState } from 'react';
import PropType from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({
  index,
  img,
  name,
  category,
  doneDate,
  url,
  tagName,
  nationality,
  alcoholicOrNot,
}) {
  const [copyLink, setCopyLink] = useState(false);

  const shareRecipe = () => {
    navigator.clipboard.writeText(url);
    setCopyLink(true);
  };
  return (
    <div data-testid={ `${index}-recipe-card` }>
      { tagName
      && (
        <h4
          data-testid={ `${index}-${tagName}-horizontal-tag` }
        >
          {tagName}
        </h4>)}
      { nationality && <h4>{nationality}</h4>}
      { alcoholicOrNot && <h4>{alcoholicOrNot}</h4>}
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <img
        src={ img }
        alt={ name }
        style={ { width: '15%' } }
        data-testid={ `${index}-horizontal-image` }
      />
      <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
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
  tagName: PropType.string,
  nationality: PropType.string,
  alcoholicOrNot: PropType.string,
}.isRequired;

export default DoneRecipeCard;

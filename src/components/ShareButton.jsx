import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ url }) {
  const [copyLink, setCopyLink] = useState(false);

  const shareRecipe = () => {
    navigator.clipboard.writeText(url);
    setCopyLink(true);
  };

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        // onclick criado com ajuda desses links
        // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
        // https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
        onClick={ shareRecipe }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {copyLink && <p>Link copied!</p>}
    </>
  );
}

export default ShareButton;

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
};

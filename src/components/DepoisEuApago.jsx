// SÓ PORQUE EU GASTEI TEMPO FAZENDO E ME RECUSO A APAGAR SIMPLESMENTE!!
// VOU COMITAR ESSE TREM E DEPOIS APAGO
// OBRIGADA, DE NADA

// MARAVILHOSO MEU CÓDIGOOOOOO
// MONGOL QUEM DISCORDAR 😝

import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    // Url da página: https://www.w3schools.com/code/tryit.asp?filename=FAF25LWITXR5
    const currentURL = window.location.href.replace('/in-progress', '');

    // Copiar: https://www.30secondsofcode.org/articles/s/copy-text-to-clipboard-with-javascript
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentURL);
      setCopied(true);
    }
  };

  useEffect(() => {
    const TWO_SECONDS = 3000;
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, TWO_SECONDS);
    }
  }, [copied]);

  return (
    <>
      <button type="button" data-testid="share-btn" onClick={ handleClick }>
        <img src={ shareIcon } alt="Share link" />
      </button>
      {copied && <span>Link copied!</span>}
    </>
  );
}

export default ShareButton;

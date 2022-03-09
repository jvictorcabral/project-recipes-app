export default (option, text) => {
  let optionQuery = '';

  if (option === 'ingredient') { optionQuery = 'filter.php?i'; }
  if (option === 'name') { optionQuery = 'search.php?s'; }
  if (option === 'firstLetter') { optionQuery = 'search.php?f'; }

  return fetch((`https://www.thecocktaildb.com/api/json/v1/1/${optionQuery}=${text}`))
    .then((response) => response.json());
};

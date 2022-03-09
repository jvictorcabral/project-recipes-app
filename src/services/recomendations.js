const fetchRecipesRecomendations = async (pathname) => {
  const source = pathname.includes('/drinks') ? 'themealdb' : 'thecocktaildb';
  return fetch(`https://www.${source}.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json())
    .then((data) => data.meals || data.drinks);
};

export default fetchRecipesRecomendations;

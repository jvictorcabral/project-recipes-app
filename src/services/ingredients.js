const fetchIngredients = async (pathname) => {
  const source = pathname.includes('/foods') ? 'themealdb' : 'thecocktaildb';
  try {
    return fetch(`https://www.${source}.com/api/json/v1/1/list.php?i=list`)
      .then((response) => response.json())
      .then((data) => data.meals || data.drinks);
  } catch (error) {
    console.log(error);
  }
};

export default fetchIngredients;

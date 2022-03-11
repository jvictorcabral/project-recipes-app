const fetchFoodOrDrink = async (pathname, id) => {
  const source = pathname.includes('/foods') ? 'themealdb' : 'thecocktaildb';
  try {
    return fetch(`https://www.${source}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => data.meals || data.drinks);
  } catch (error) {
    console.log(error);
  }
};

export default fetchFoodOrDrink;

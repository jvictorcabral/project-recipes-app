// Finge que tá lindo pq eu quero terminar meus requisitos :)

const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const fetchCategories = async (pathname) => {
  if (pathname === '/foods') {
    const response = await fetch(mealsUrl);
    const results = await response.json();
    return results.meals;
  }
  const response = await fetch(drinksUrl);
  const results = await response.json();
  return results.drinks;
};

export const fetchFoodOrDrink = async (pathname, id) => {
  if (pathname.includes('/foods')) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => data.meals);
  }
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export default fetchCategories;

const fetchRandomDrink = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => data.drinks[0].idDrink)
);

export default fetchRandomDrink;

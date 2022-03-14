const fetchNationalities = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => console.log(error))
);

export default fetchNationalities;

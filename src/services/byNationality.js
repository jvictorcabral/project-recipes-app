const fetchByNationality = (area) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json())
    .then((data) => data.meals)
);

export default fetchByNationality;

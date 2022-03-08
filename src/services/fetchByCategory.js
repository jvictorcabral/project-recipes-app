const fetchByCategory = async (pathname, category) => {
  const source = pathname === '/foods' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(
    `https://www.${source}.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const results = await response.json();
  return results;
};

export default fetchByCategory;

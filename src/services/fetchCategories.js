const fetchCategories = async (pathname) => {
  const source = pathname === '/foods' ? 'themealdb' : 'thecocktaildb';
  const array = pathname === '/foods' ? 'meals' : 'drinks';
  const response = await fetch(`https://www.${source}.com/api/json/v1/1/list.php?c=list`);
  const results = await response.json();
  return results[array];
};

export default fetchCategories;

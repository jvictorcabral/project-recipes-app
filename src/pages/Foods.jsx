import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import fetchMeals from '../services/mealsApi';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Foods({ location: { pathname } }) {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const MEALS_QUANTITY = 12;
    const getMeals = async () => {
      const results = await fetchMeals('name', '');
      setMeals(results.meals.slice(0, MEALS_QUANTITY));
    };
    getMeals();
  }, []);

  return (
    <div>
      <Header title="Foods" />
      <SearchBar />
      <CategoryFilters pathname={ pathname } />
      {meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <RecipeCard
          key={ idMeal }
          img={ strMealThumb }
          name={ strMeal }
          index={ index }
        />
      ))}
    </div>
  );
}

Foods.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
};

export default Foods;

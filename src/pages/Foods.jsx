import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import fetchMeals from '../services/mealsApi';
import RecipeCard from '../components/RecipeCard';
import fetchByCategory from '../services/fetchByCategory';
import { RECIPES_PER_PAGE } from '../constants/constants';
import Header from '../components/Header';

function Foods({ location: { pathname } }) {
  const [meals, setMeals] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const getMeals = async () => {
      const results = await fetchMeals('name', '');
      setMeals(results.meals.slice(0, RECIPES_PER_PAGE));
    };
    getMeals();
  }, []);

  const selectCategory = ({ target: { name } }) => {
    setCategoryFilter(name);
  };

  useEffect(() => {
    if (categoryFilter !== '') {
      const filterByCategory = async () => {
        const results = await fetchByCategory(pathname, categoryFilter);
        setMeals(results.meals.slice(0, RECIPES_PER_PAGE));
      };
      filterByCategory();
    }
  }, [categoryFilter, pathname]);

  return (
    <div>
      <Header title="Foods" />
      <CategoryFilters pathname={ pathname } handleClick={ selectCategory } />
      {meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <RecipeCard
          key={ idMeal }
          img={ strMealThumb }
          name={ strMeal }
          index={ index }
          handleClick={ selectCategory }
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

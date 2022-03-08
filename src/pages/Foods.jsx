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

  const getMeals = async () => {
    const results = await fetchMeals('name', '');
    setMeals(results.meals.slice(0, RECIPES_PER_PAGE));
  };

  useEffect(() => {
    getMeals();
  }, []);

  const selectCategory = ({ target: { name } }) => {
    if (categoryFilter === name) {
      setCategoryFilter('');
    } else {
      setCategoryFilter(name);
    }
  };

  useEffect(() => {
    if (categoryFilter !== '') {
      const filterByCategory = async () => {
        const results = await fetchByCategory(pathname, categoryFilter);
        setMeals(results.meals.slice(0, RECIPES_PER_PAGE));
      };
      filterByCategory();
    } else {
      getMeals();
    }
  }, [categoryFilter, pathname]);

  return (
    <div>
      <Header title="Foods" />
<<<<<<< HEAD
      <CategoryFilters
        pathname={ pathname }
        handleClick={ selectCategory }
        categoryFilter={ categoryFilter }
      />
=======
      <CategoryFilters pathname={ pathname } handleClick={ selectCategory } />
>>>>>>> c098c2f96ac76513c3ffa39dae90b5ff3a03bda3
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

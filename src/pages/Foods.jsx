import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';
import fetchMeals from '../services/mealsApi';
import RecipeCard from '../components/RecipeCard';
import fetchByCategory from '../services/fetchByCategory';
import { RECIPES_PER_PAGE } from '../constants/constants';
import Header from '../components/Header';

function Foods({ location: { pathname }, history }) {
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
      <CategoryFilters
        pathname={ pathname }
        handleClick={ selectCategory }
        categoryFilter={ categoryFilter }
      />
      {meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <Link to={ `${pathname}/${idMeal}` } key={ idMeal }>
          <RecipeCard
            img={ strMealThumb }
            name={ strMeal }
            index={ index }
            handleClick={ selectCategory }
            recipeId={ idMeal }
            pathname={ pathname }
          />
        </Link>
      ))}
      <Footer history={ history } />
    </div>
  );
}

Foods.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
  history: PropType.objectOf(PropType.any).isRequired,
};

export default Foods;

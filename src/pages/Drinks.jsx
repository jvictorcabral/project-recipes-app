import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import fetchDrinks from '../services/drinksApi';
import RecipeCard from '../components/RecipeCard';
import fetchByCategory from '../services/fetchByCategory';
import { RECIPES_PER_PAGE } from '../constants/constants';

function Drinks({ location: { pathname } }) {
  const [drinks, setDrinks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  const getDrinks = async () => {
    const results = await fetchDrinks('name', '');
    setDrinks(results.drinks.slice(0, RECIPES_PER_PAGE));
  };

  useEffect(() => {
    getDrinks();
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
        setDrinks(results.drinks.slice(0, RECIPES_PER_PAGE));
      };
      filterByCategory();
    } else {
      getDrinks();
    }
  }, [categoryFilter, pathname]);

  return (
    <div>
      <CategoryFilters
        pathname={ pathname }
        handleClick={ selectCategory }
        categoryFilter={ categoryFilter }
      />
      {drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <RecipeCard
          key={ idDrink }
          img={ strDrinkThumb }
          name={ strDrink }
          index={ index }
        />
      ))}
    </div>
  );
}

Drinks.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
};

export default Drinks;

import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';
import fetchDrinks from '../services/drinksApi';
import RecipeCard from '../components/RecipeCard';
import fetchByCategory from '../services/fetchByCategory';
import { RECIPES_PER_PAGE } from '../constants/constants';
import Header from '../components/Header';

function Drinks({ location: { pathname }, history }) {
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
      <Header title="Drinks" />
      <CategoryFilters
        pathname={ pathname }
        handleClick={ selectCategory }
        categoryFilter={ categoryFilter }
      />
      {drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <Link to={ `${pathname}/${idDrink}` } key={ idDrink }>
          <RecipeCard
            key={ idDrink }
            img={ strDrinkThumb }
            name={ strDrink }
            index={ index }
            recipeId={ idDrink }
            pathname={ pathname }
          />
        </Link>
      ))}
      <Footer history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
  history: PropType.objectOf(PropType.any).isRequired,
};

export default Drinks;

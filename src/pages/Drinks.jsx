import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';
import fetchDrinks from '../services/drinksApi';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

function Drinks({ location: { pathname }, history }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const MEALS_QUANTITY = 12;
    const getMeals = async () => {
      const results = await fetchDrinks('name', '');
      setDrinks(results.drinks.slice(0, MEALS_QUANTITY));
    };
    getMeals();
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      <CategoryFilters pathname={ pathname } />
      {drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <RecipeCard
          key={ idDrink }
          img={ strDrinkThumb }
          name={ strDrink }
          index={ index }
        />
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

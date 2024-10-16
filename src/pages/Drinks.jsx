import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';
import fetchDrinks from '../services/drinksApi';
import RecipeCard from '../components/RecipeCard';
import fetchByCategory from '../services/fetchByCategory';
import { RECIPES_PER_PAGE } from '../constants/constants';
import Header from '../components/Header';
import { removeIngredient } from '../redux/actions';

function Drinks({ location: { pathname }, history, ingredient, resetIngredient }) {
  const [drinks, setDrinks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  const getDrinks = async () => {
    const results = await fetchDrinks('name', '');
    setDrinks(results.drinks.slice(0, RECIPES_PER_PAGE));
  };

  const getDrinksByIngredient = async () => {
    const results = await fetchDrinks('ingredient', ingredient);
    setDrinks(results.drinks.slice(0, RECIPES_PER_PAGE));
  };

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
        setDrinks((results && results.drinks)
          ? results.drinks.slice(0, RECIPES_PER_PAGE) : []);
      };
      filterByCategory();
    } else if (ingredient !== '') {
      getDrinksByIngredient();
    } else {
      getDrinks();
    }

    return () => {
      if (ingredient !== '') resetIngredient();
    };
  }, [categoryFilter, pathname, ingredient,
    getDrinksByIngredient, getDrinks, resetIngredient]);

  return (
    <div>
      <Header title="Drinks" />
      <CategoryFilters
        pathname={ pathname }
        handleClick={ selectCategory }
        categoryFilter={ categoryFilter }
      />
      <section className="section-foods">
        {Array.isArray(drinks) && drinks.length > 0 ? (
          drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <Link to={ `${pathname}/${idDrink}` } key={ idDrink }>
              <RecipeCard
                img={ strDrinkThumb }
                name={ strDrink }
                index={ index }
                recipeId={ idDrink }
                pathname={ pathname }
              />
            </Link>
          ))
        ) : (
          <p>No drinks available or loading...</p>
        )}
      </section>
      <Footer history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  ingredient: PropTypes.string.isRequired,
  resetIngredient: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = ({ ingredient }) => ({
  ingredient,
});

const mapDispatchToProps = (dispatch) => ({
  resetIngredient: () => dispatch(removeIngredient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

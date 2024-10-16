import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';
import fetchMeals from '../services/mealsApi';
import RecipeCard from '../components/RecipeCard';
import fetchByCategory from '../services/fetchByCategory';
import { RECIPES_PER_PAGE } from '../constants/constants';
import Header from '../components/Header';
import '../styles/Foods.css';
import { removeIngredient } from '../redux/actions';

function Foods({ location: { pathname }, history, ingredient, resetIngredient }) {
  const [meals, setMeals] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  const getMeals = async () => {
    const results = await fetchMeals('name', '');
    setMeals(results.meals.slice(0, RECIPES_PER_PAGE));
  };

  const getMealsByIngredient = async () => {
    const results = await fetchMeals('ingredient', ingredient);
    setMeals(results.meals.slice(0, RECIPES_PER_PAGE));
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
        setMeals(results.meals.slice(0, RECIPES_PER_PAGE));
      };
      filterByCategory();
    } else if (ingredient !== '') {
      getMealsByIngredient();
    } else {
      getMeals();
    }

    return (() => {
      if (ingredient !== '') resetIngredient();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, pathname]);

  return (
    <div>
      <Header title="Foods" />
      <CategoryFilters
        pathname={ pathname }
        handleClick={ selectCategory }
        categoryFilter={ categoryFilter }
      />
      { console.log(meals) }
      <section className="section-foods">
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
      </section>
      <Footer history={ history } />
    </div>
  );
}

Foods.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Foods);

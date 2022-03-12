import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';
import fetchMeals from '../services/mealsApi';
import RecipeCard from '../components/RecipeCard';
import fetchByCategory from '../services/fetchByCategory';
import { RECIPES_PER_PAGE } from '../constants/constants';
import Header from '../components/Header';
import { removeIngredient } from '../redux/actions';
import SearchBar from '../components/SearchBar';

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
      <SearchBar />
      <CategoryFilters pathname={ pathname } />
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
  ingredient: PropType.string.isRequired,
  resetIngredient: PropType.func.isRequired,
};

const mapStateToProps = ({ ingredient }) => ({
  ingredient,
});

const mapDispatchToProps = (dispatch) => ({
  resetIngredient: () => dispatch(removeIngredient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);

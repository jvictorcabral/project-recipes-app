import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchNationalities from '../services/nationalities';
import fetchByNationality from '../services/byNationality';
import fetchMeals from '../services/mealsApi';
import RecipeCard from '../components/RecipeCard';
import { RECIPES_PER_PAGE } from '../constants/constants';

function Nationalities({ history }) {
  const [nationalities, setNationalities] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [dropdown, setDropdown] = useState('');

  useEffect(() => {
    const getNations = async () => {
      const nations = await fetchNationalities();
      setNationalities(nations.map(({ strArea }) => strArea));
    };
    getNations();
  }, []);

  useEffect(() => {
    if (nationalities.length > 0) {
      setDropdown(nationalities[0]);
    }
  }, [nationalities]);

  // useEffect(() => {
  //   if (dropdown !== '') {
  //     const getRecipes = async () => {
  //       const meals = await fetchByNatiolities(dropdown);
  //       setRecipes(meals.slice(0, RECIPES_PER_PAGE));
  //     };
  //     getRecipes();
  //   }
  // }, [dropdown]);

  useEffect(() => {
    const getRecipes = async () => {
      const results = await fetchMeals('name', '');
      setRecipes(results.meals.slice(0, RECIPES_PER_PAGE));
    };
    getRecipes();
  }, []);

  const selectNation = async ({ target }) => {
    setDropdown(target.value);
    const meals = await fetchByNationality(target.value);
    setRecipes(meals.slice(0, RECIPES_PER_PAGE));
  };

  return (
    <main>
      <Header title="Explore Nationalities" />
      <section>
        <select
          data-testid="explore-by-nationality-dropdown"
          value={ dropdown }
          onChange={ selectNation }
        >
          {nationalities.map((nation) => (
            <option
              key={ nation }
              data-testid={ `${nation}-option` }
              value={ nation }
            >
              {nation}
            </option>
          ))}
        </select>
      </section>
      <section>
        {recipes.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <Link to={ `/foods/${idMeal}` } key={ idMeal }>
            <RecipeCard
              img={ strMealThumb }
              name={ strMeal }
              index={ index }
              // handleClick={ selectCategory }
              recipeId={ idMeal }
              // pathname={ pathname }
            />
          </Link>
        ))}
      </section>
      <Footer history={ history } />
    </main>
  );
}

export default Nationalities;

Nationalities.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

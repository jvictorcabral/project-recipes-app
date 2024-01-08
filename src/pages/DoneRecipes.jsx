import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [filterAllFoods, setFilterAllFoods] = useState(true);
  const [filterAllDrinks, setFilterAllDrinks] = useState(true);

  const doneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipesArr = JSON.parse(doneRecipes);
  const filterFoodsArr = doneRecipesArr.filter((foods) => (
    foods.type === 'meals'
  ));
  const filterDrinksArr = doneRecipesArr.filter((drinks) => (
    drinks.type === 'cocktails'
  ));

  function filterAll() {
    setFilterAllFoods(true);
    setFilterAllDrinks(true);
    console.log(doneRecipesArr);
  }

  function filterFoods() {
    setFilterAllFoods(true);
    setFilterAllDrinks(false);
  }

  function filterDrinks() {
    setFilterAllFoods(false);
    setFilterAllDrinks(true);
  }

  useEffect(() => {
  }, [filterAllFoods, filterAllDrinks]);
  return (
    <div>
      <Header title="Done Recipes" />
      <div className="done_recipes-btn">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterFoods }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterDrinks }
        >
          Drinks
        </button>
      </div>
      <div className="container">
        { filterAllFoods
          && filterFoodsArr.map((recipe, key) => (
            <DoneRecipeCard
              data-testid="filter-by-food-btn"
              key={ key }
              img={ recipe.image }
              name={ recipe.name }
              index={ key }
              category={ recipe.category }
              doneDate={ recipe.doneDate }
              tagName={ recipe.tags }
              nationality={ recipe.nationality }
              url={ `http://localhost:3000/foods/${recipe.id}` }
              url2={ `/foods/${recipe.id}` }
            />
          ))}
        { filterAllDrinks
          && filterDrinksArr.map((recipe, key) => (
            <DoneRecipeCard
              data-testid="filter-by-drink-btn"
              key={ key }
              img={ recipe.image }
              name={ recipe.name }
              index={ key }
              doneDate={ recipe.doneDate }
              url={ `http://localhost:3000/drinks/${recipe.id}` }
              url2={ `/drinks/${recipe.id}` }
            />
          ))}
      </div>
    </div>
  );
}

export default DoneRecipes;

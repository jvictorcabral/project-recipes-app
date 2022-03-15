import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [filterAllRecipes, setFilterAllRecipes] = useState(true);
  const [filterAllFoods, setFilterAllFoods] = useState(false);
  const [filterAllDrinks, setFilterAllDrinks] = useState(false);

  const doneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipesArr = JSON.parse(doneRecipes);
  const filterFoodsArr = doneRecipesArr.filter((foods) => (
    foods.type === 'meals'
  ));
  const filterDrinksArr = doneRecipesArr.filter((drinks) => (
    drinks.type === 'cocktails'
  ));

  function filterAll() {
    setFilterAllFoods(false);
    setFilterAllDrinks(false);
    setFilterAllRecipes(true);
    console.log(doneRecipesArr);
  }

  function filterFoods() {
    setFilterAllFoods(true);
    setFilterAllDrinks(false);
    setFilterAllRecipes(false);
    console.log(filterFoodsArr);
  }

  function filterDrinks() {
    setFilterAllFoods(false);
    setFilterAllDrinks(true);
    setFilterAllRecipes(false);
    console.log(filterDrinksArr);
  }

  useEffect(() => {
  }, [filterAllRecipes, filterAllFoods, filterAllDrinks]);
  return (
    <div>
      <Header title="Done Recipes" />
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
      { filterAllRecipes
        && doneRecipesArr.map((recipe, key) => (recipe.type === 'meals'
          ? (
            <DoneRecipeCard
              data-testid="filter-by-all-btn"
              key={ key }
              img={ recipe.image }
              name={ recipe.name }
              index={ key }
              category={ recipe.category }
              doneDate={ recipe.doneDate }
              tagName={ recipe.tags }
              nationality={ recipe.nationality }
            />)
          : (
            <DoneRecipeCard
              data-testid="filter-by-drink-btn"
              key={ key }
              img={ recipe.image }
              name={ recipe.name }
              index={ key }
              category={ recipe.category }
              doneDate={ recipe.doneDate }
              tagName={ recipe.tags }
              alcoholicOrNot={ recipe.alcoholicOrNot }
            />
          )
        ))}
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
            category={ recipe.category }
            doneDate={ recipe.doneDate }
            tagName={ recipe.tags }
          />
        ))}
    </div>
  );
}

export default DoneRecipes;

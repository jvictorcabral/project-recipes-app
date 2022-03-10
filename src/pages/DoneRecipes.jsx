import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  function filterAll() {
    console.log('function yet to be created :)');
    // map doneRecipes array using recipeCard.jsx
    // do the same with filterFoods and filterDrinks,
    // but you'll have to map only the correct items in those cases
    // O imagem do card de receita deve ter o atributo data-testid="${index}-horizontal-image";
    // O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text";
    // O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name";
    // O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date";
    // O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn";
    // As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag;
  }

  function filterFoods() {
    console.log('function yet to be created as well :)');
  }

  function filterDrinks() {
    console.log('function yet to be created, too :)');
  }
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
    </div>
  );
}

export default DoneRecipes;

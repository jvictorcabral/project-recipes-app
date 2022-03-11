import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomMeal from '../services/randomMeal';

function ExploreFoods({ history }) {
  const getRandomMeal = async () => {
    const id = await fetchRandomMeal();
    console.log(id);
    history.push(`/foods/${id}`);
  };

  return (
    <main>
      <Header title="Explore Foods" />
      <button type="button" data-testid="explore-by-ingredient">
        By Ingredient
      </button>
      <button type="button" data-testid="explore-by-nationality">
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandomMeal }
      >
        Surprise me!
      </button>
      <Footer history={ history } />
    </main>
  );
}

export default ExploreFoods;

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

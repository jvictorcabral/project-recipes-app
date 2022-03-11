import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomDrink from '../services/randomDrink';

function ExploreDrinks({ history }) {
  const getRandomDrink = async () => {
    const id = await fetchRandomDrink();
    console.log(id);
    history.push(`/drinks/${id}`);
  };

  return (
    <main>
      <Header title="Explore Drinks" />
      <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandomDrink }
      >
        Surprise me!
      </button>
      <Footer history={ history } />
    </main>
  );
}

export default ExploreDrinks;

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

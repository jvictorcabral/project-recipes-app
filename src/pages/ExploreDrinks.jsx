import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks({ history }) {
  const handleClick = ({ target }) => {
    history.push(`/explore/drinks/${target.name}`);
  };

  return (
    <main>
      <Header title="Explore Drinks" />
      <button
        type="button"
        name="ingredients"
        data-testid="explore-by-ingredient"
        onClick={ handleClick }
      >
        By Ingredient
      </button>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
      <Footer history={ history } />
    </main>
  );
}

export default ExploreDrinks;

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

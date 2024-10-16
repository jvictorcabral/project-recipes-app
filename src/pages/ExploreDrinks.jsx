import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomDrink from '../services/randomDrink';
import '../styles/exploreDrink.css';

function ExploreDrinks({ history }) {
  const getRandomDrink = async () => {
    const id = await fetchRandomDrink();
    history.push(`/drinks/${id}`);
  };

  const handleClick = ({ target }) => {
    history.push(`/explore/drinks/${target.name}`);
  };

  return (
    <main>
      <Header title="Explore Drinks" />
      <div className="explore_drink-btn">
        <button
          type="button"
          name="ingredients"
          data-testid="explore-by-ingredient"
          onClick={ handleClick }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ getRandomDrink }
        >
          Surprise me!
        </button>
      </div>
      <Footer history={ history } />
    </main>
  );
}

export default ExploreDrinks;

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

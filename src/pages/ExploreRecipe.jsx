import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreRecipe({ history }) {
  const [page, setPage] = useState('');

  useEffect(() => {
    setPage(window.location.href.includes('foods') ? 'foods' : 'drinks');
  }, []);

  return (
    <main>
      <Header title="Explore Drinks" />
      <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      {page === 'foods' && (
        <button type="button" data-testid="explore-by-nationality">By Nationality</button>
      )}
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
      <Footer history={ history } />
    </main>
  );
}

export default ExploreRecipe;

ExploreRecipe.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

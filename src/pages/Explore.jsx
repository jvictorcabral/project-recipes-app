import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/explore.css';

function Explore({ history }) {
  return (
    <main className="explore">
      <Header title="Explore" />
      <div className="explore-btn">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer history={ history } />
    </main>
  );
}

export default Explore;

Explore.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

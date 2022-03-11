import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods({ history }) {
  return (
    <main>
      <Header title="Explore" />
      <Footer history={ history } />
    </main>
  );
}

export default ExploreFoods;

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

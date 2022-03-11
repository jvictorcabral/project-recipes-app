import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Nationalities({ history }) {
  return (
    <main>
      <Header title="Nacionalidades" />
      <Footer history={ history } />
    </main>
  );
}

export default Nationalities;

Nationalities.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

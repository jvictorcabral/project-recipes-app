import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodsIngredients({ history }) {
  return (
    <main>
      <Header title="Ingredientizinhos das Comidinhas" />
      <Footer history={ history } />
    </main>
  );
}

export default FoodsIngredients;

FoodsIngredients.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

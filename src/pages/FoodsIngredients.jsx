import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredients from '../services/ingredients';

function FoodsIngredients({ history, location: { pathname } }) {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const MAX_RECOMENDATION = 12;
    const ingredientsAPI = await fetchIngredients(pathname);
    setIngredients(
      ingredientsAPI.filter((a, index) => index < MAX_RECOMENDATION),
    );
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <main>
      <Header title="Foods Ingredients" />
      {ingredients.map(({ strIngredient }, index) => (
        <div data-testid={ `${index}-card-name` } key={ strIngredient }>
          <p data-testid={ `${index}-ingredient-card` }>
            {strIngredient}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}.png` }
            alt={ strIngredient }
          />
        </div>
      ))}
      <Footer history={ history } />
    </main>
  );
}

export default FoodsIngredients;

FoodsIngredients.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

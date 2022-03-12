import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredients from '../services/ingredients';
import { getIngredient } from '../redux/actions';

function DrinksIngredients({ history, location: { pathname }, setIngredient }) {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const MAX_INGREDIENTS = 12;
    const ingredientsAPI = await fetchIngredients(pathname);
    setIngredients(
      ingredientsAPI.filter((a, index) => index < MAX_INGREDIENTS),
    );
  };

  useEffect(() => {
    getIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Header title="Drinks Ingredients" />
      {ingredients.map(({ strIngredient1 }, index) => (
        <Link
          to="/drinks"
          onClick={ () => setIngredient(strIngredient1) }
          data-testid={ `${index}-card-name` }
          key={ strIngredient1 }
        >
          <p data-testid={ `${index}-ingredient-card` }>
            {strIngredient1}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt={ strIngredient1 }
          />
        </Link>
      ))}
      <Footer history={ history } />
    </main>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setIngredient: (payload) => dispatch(getIngredient(payload)),
});

export default connect(null, mapDispatchToProps)(DrinksIngredients);

DrinksIngredients.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  setIngredient: PropTypes.func.isRequired,
}.isRequired;

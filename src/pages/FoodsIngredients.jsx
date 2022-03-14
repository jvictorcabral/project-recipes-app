import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredients from '../services/ingredients';
import { getIngredient } from '../redux/actions';

function FoodsIngredients({ history, location: { pathname }, setIngredient }) {
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
  }, []);

  return (
    <main>
      <Header title="Explore Ingredients" />
      {ingredients.map(({ strIngredient }, index) => (
        <Link
          to="/foods"
          onClick={ () => setIngredient(strIngredient) }
          data-testid={ `${index}-card-name` }
          key={ strIngredient }
        >
          <p data-testid={ `${index}-ingredient-card` }>
            {strIngredient}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
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

export default connect(null, mapDispatchToProps)(FoodsIngredients);

FoodsIngredients.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

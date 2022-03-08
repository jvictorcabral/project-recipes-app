import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer({ history }) {
  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
        data-testid="food-bottom-btn"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal" />
      </button>
    </footer>
  );
}

export default Footer;

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

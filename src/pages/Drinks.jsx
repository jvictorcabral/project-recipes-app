import React from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';

function Drinks({ location: { pathname }, history }) {
  return (
    <div>
      <CategoryFilters pathname={ pathname } />
      <Footer history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
  history: PropType.objectOf(PropType.any).isRequired,
};

export default Drinks;

import React from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';

function Drinks({ location: { pathname } }) {
  return (
    <div>
      <CategoryFilters pathname={ pathname } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
};

export default Drinks;

import React from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import Header from '../components/Header';

function Drinks({ location: { pathname } }) {
  return (
    <div>
      <Header title="Drinks" />
      <CategoryFilters pathname={ pathname } />
    </div>
  );
}

Drinks.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
};

export default Drinks;

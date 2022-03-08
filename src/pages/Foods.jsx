import React from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import Header from '../components/Header';

function Foods({ location: { pathname } }) {
  return (
    <div>
      <Header title="Foods" />
      <CategoryFilters pathname={ pathname } />
    </div>
  );
}

Foods.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
};

export default Foods;

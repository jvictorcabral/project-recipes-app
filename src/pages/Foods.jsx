import React from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';

function Foods({ location: { pathname } }) {
  return (
    <div>
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
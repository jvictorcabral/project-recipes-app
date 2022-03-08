import React from 'react';
import PropType from 'prop-types';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';

function Foods({ location: { pathname }, history }) {
  return (
    <div>
      <CategoryFilters pathname={ pathname } />
      <Footer history={ history } />
    </div>
  );
}

Foods.propTypes = {
  location: PropType.shape({
    pathname: PropType.string,
  }).isRequired,
  history: PropType.objectOf(PropType.any).isRequired,
};

export default Foods;

import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import fetchCategories from '../services/categories';

function CategoryFilters({ pathname }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const CATEGORIES_QUANTITY = 5;

    const getCategories = async () => {
      const data = await fetchCategories(pathname);
      setCategories(
        data.slice(0, CATEGORIES_QUANTITY).map(({ strCategory }) => strCategory),
      );
    };
    getCategories();
  }, [pathname]);

  return (
    <div>
      {categories.map((category) => (
        <button
          key={ category }
          type="button"
          data-testid={ `${category}-category-filter` }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryFilters.propTypes = {
  pathname: PropType.string.isRequired,
};

export default CategoryFilters;

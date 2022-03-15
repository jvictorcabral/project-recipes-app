import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import fetchCategories from '../services/fetchCategories';
import '../styles/CategoryFilters.css';

function CategoryFilters({ pathname, handleClick, categoryFilter }) {
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
    <nav className="categories-nav">
      {categories.map((category) => (
        <button
          key={ category }
          type="button"
          data-testid={ `${category}-category-filter` }
          name={ category }
          onClick={ handleClick }
          className={ category === categoryFilter
            ? 'category-btn selected' : 'category-btn' }
        >
          {category}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        name=""
        onClick={ handleClick }
        className={ categoryFilter === ''
          ? 'category-btn selected' : 'category-btn' }
      >
        All
      </button>
    </nav>
  );
}

CategoryFilters.propTypes = {
  pathname: PropType.string.isRequired,
  handleClick: PropType.func.isRequired,
  categoryFilter: PropType.string.isRequired,
};

export default CategoryFilters;

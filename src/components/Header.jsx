import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [searchClicked, setSearchClicked] = useState(false);
  const { title } = props;

  const validateSearch = () => {
    if (searchClicked) {
      setSearchClicked(false);
    } else {
      setSearchClicked(true);
    }
  };

  return (
    <header>
      <Link to="/profile">
        <img
          src={ profile }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      { (title === 'Foods'
        || title === 'Explore Nationalities'
        || title === 'Drinks')
        && (
          <button
            onClick={ validateSearch }
            type="button"
          >
            <img
              src={ search }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
        ) }
      { (searchClicked) && (
        <SearchBar />
      ) }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

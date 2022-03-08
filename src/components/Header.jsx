import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header(props) {
  const { title } = props;

  function searchIcon() {
    return (
      <img
        src={ search }
        alt="search"
        data-testid="search-top-btn"
      />
    );
  }

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
        || title === 'Drinks') && searchIcon() }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

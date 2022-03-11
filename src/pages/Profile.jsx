import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const [user, setUser] = useState('');

  const getUser = () => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    setUser(userStorage);
  };

  const removeProfile = () => {
    // localStorage.removeItem('user');
    // localStorage.removeItem('favoriteRecipes');
    // localStorage.removeItem('inProgressRecipes');
    // localStorage.removeItem('doneRecipes', null);
    // localStorage.removeItem('mealsToken', null);
    // localStorage.removeItem('cocktails', null);
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main>
      <Header title="Profile" />
      <h2 data-testid="profile-email">
        {user.email}
      </h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ removeProfile }
      >
        Logout
      </button>
      <Footer history={ history } />
    </main>
  );
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

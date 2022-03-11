import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  return (
    <main>
      <Header title="Perfil" />
      <Footer history={ history } />
    </main>
  );
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

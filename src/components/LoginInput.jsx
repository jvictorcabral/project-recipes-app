import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function LoginInput() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  function disableButton() {
    const MAGIC_NUM = 6;
    if (
      userEmail.includes('@')
        && userEmail.includes('.com')
        && userPassword.length > MAGIC_NUM) {
      return false;
    }
    return true;
  }

  function saveUserInfo() {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setRedirect(true);
  }

  return (
    <form>
      { redirect && <Redirect to="/foods" /> }
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          placeholder="Ex: ada@lovelace.com"
          type="email"
          id="email"
          onChange={ ({ target }) => setUserEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          data-testid="password-input"
          placeholder="Ex: mypassword123"
          type="password"
          id="password"
          onChange={ ({ target }) => setUserPassword(target.value) }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ disableButton() }
        onClick={ saveUserInfo }
      >
        Enter
      </button>
    </form>
  );
}

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import renderWithRouter from '../renderWithRouter';
import Login from '../pages/Login';

describe('Test the component LoginInput.jsx', () => {
  const email = 'email-input';
  const password = 'password-input';
  const button = 'login-submit-btn';
  const lovelace = 'ada@lovelace.com';
  const standardPassword = '1234567';
  // req 2
  it('Test if there is an email input, a password input and a button', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  // reqs 3&4
  it('Test if it is possible to write in the email and password fields', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);

    userEvent.type(emailInput, lovelace);
    userEvent.type(passwordInput, standardPassword);

    expect(emailInput).toHaveValue(lovelace);
    expect(passwordInput).toHaveValue(standardPassword);
  });
  // req 5
  it('Test if the button is disabled if the email is invalid', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    userEvent.type(emailInput, 'adalovelace.com');
    userEvent.type(passwordInput, standardPassword);

    expect(submitButton).toBeDisabled();
  });
  it('Test if the button is disabled if the email is invalid', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    userEvent.type(emailInput, 'ada@lovelace');
    userEvent.type(passwordInput, standardPassword);

    expect(submitButton).toBeDisabled();
  });
  it('Test if the button is disabled if the password is invalid', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    userEvent.type(emailInput, lovelace);
    userEvent.type(passwordInput, '123456');

    expect(submitButton).toBeDisabled();
  });
  it('Test if the button is enabled if the email and the password are valid', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    userEvent.type(emailInput, lovelace);
    userEvent.type(passwordInput, standardPassword);

    expect(submitButton).toBeEnabled();
  });
  // req 6
  it('Test if mealsToken and cocktailsToken are saved in the localStorage', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    userEvent.type(emailInput, lovelace);
    userEvent.type(passwordInput, standardPassword);
    userEvent.click(submitButton);

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');

    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });
  // req 7
  it('Test if the email is saved in the localStorage', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    userEvent.type(emailInput, lovelace);
    userEvent.type(passwordInput, standardPassword);
    userEvent.click(submitButton);

    const savedEmail = localStorage.getItem('user');

    expect(savedEmail).toBe('{"email":"ada@lovelace.com"}');
  });
  // req 8
  it('Test if the submitButton redirects to /foods', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Login />
      </Router>,
    );

    history.push('/');

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    userEvent.type(emailInput, lovelace);
    userEvent.type(passwordInput, standardPassword);
    userEvent.click(submitButton);

    expect(history.location.pathname).toBe('/foods');
  });
});

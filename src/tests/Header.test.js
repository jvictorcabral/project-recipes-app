import React from 'react';
import { screen } from '@testing-library/react';
// import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
import renderWithRouter from '../renderWithRouter';
import Header from '../components/Header';
// import Login from '../pages/Login';
// import Foods from '../pages/Foods';
// import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodsIngredients from '../pages/FoodsIngredients';
import DrinksIngredients from '../pages/DrinksIngredients';
import Nationalities from '../pages/Nacionalities';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Test the component Header.jsx', () => {
  // req 9
  const profile = 'profile-top-btn';
  const title = 'page-title';
  const search = 'search-top-btn';
  it('Test if there is a profile picture, a title and a search button', () => {
    renderWithRouter(<Header title="Foods" />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);
    const searchBtn = screen.getByTestId(search);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  // req 10
  // it('Test if Login.jsx does not contain a Header', () => {
  //   renderWithRouter(<Login />);

  //   const loginBody = screen.getAllByRole('html');

  //   expect(loginBody).not.toContainHTML('data-testid="page-title"');
  // });
  // it('Test if Header.jsx contains the correct icons on Foods.jsx', () => {
  //   renderWithRouter(<Drinks />);

  //   const profileBtn = screen.getByTestId(profile);
  //   const pageTitle = screen.getByTestId(title);
  //   const searchBtn = screen.getByTestId(search);

  //   expect(profileBtn).not.toBeInTheDocument();
  //   expect(pageTitle).toBeInTheDocument();
  //   expect(searchBtn).toBeInTheDocument();
  // });
  it('Test if Header.jsx contains the correct icons on Explore.jsx', () => {
    renderWithRouter(<Explore />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on ExploreFoods.jsx', () => {
    renderWithRouter(<ExploreFoods />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on ExploreDrinks.jsx', () => {
    renderWithRouter(<ExploreDrinks />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on FoodsIngredients.jsx', () => {
    renderWithRouter(<FoodsIngredients />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on DrinksIngredients.jsx', () => {
    renderWithRouter(<DrinksIngredients />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on Nationalities.jsx', () => {
    renderWithRouter(<Nationalities />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);
    const searchBtn = screen.getByTestId(search);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on Profile.jsx', () => {
    renderWithRouter(<Profile />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on DoneRecipes.jsx', () => {
    renderWithRouter(<DoneRecipes />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Test if Header.jsx contains the correct icons on FavoriteRecipes.jsx', () => {
    renderWithRouter(<FavoriteRecipes />);

    const profileBtn = screen.getByTestId(profile);
    const pageTitle = screen.getByTestId(title);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  // req 11

  // it('Test if the user is redirected to the /profile when they click on "perfil"', () => {
  //   renderWithRouter(<Foods />);

  //   const profileBtn = screen.getByTestId(profile);

  //   userEvent('click', profileBtn);

  //   const profileH1 = screen.getByText(/Profile/i);

  //   expect(profileH1).toBeInTheDocument();
  // });
});

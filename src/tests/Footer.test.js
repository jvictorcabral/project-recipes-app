import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import App from '../App';
// import RecipeDetails from '../pages/RecipeDetails';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodsIngredients from '../pages/FoodsIngredients';
import DrinksIngredients from '../pages/DrinksIngredients';
import Nationalities from '../pages/Nationalities';
// import Profile from '../pages/Profile';

// Req 19
describe('Implemente o footer respeitando os atributos descritos no protótipo', () => {
  it('O menu inferior deve ter possuir o atributo data-testid="footer"', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('O elemento que leva para as bebidas deve possuir o data-testid', () => {
    renderWithRouter(<Footer />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    expect(drinksBtn).toBeInTheDocument();
  });

  it('O elemento que leva para explorar deve possuir o atributo data-testid', () => {
    renderWithRouter(<Footer />);
    const exploreBtn = screen.getByTestId('explore-bottom-btn');

    expect(exploreBtn).toBeInTheDocument();
  });

  it('O elemento que leva para as comidas deve possuir o atributo data-testid', () => {
    renderWithRouter(<Footer />);
    const foodsBtn = screen.getByTestId('food-bottom-btn');

    expect(foodsBtn).toBeInTheDocument();
  });
});

// Req 20
describe('Posicione o menu inferior de forma fixa e apresente 3 ícones', () => {
  // it('O menu inferior deve ficar fixado sempre ao final da página', () => {

  // });

  it('Apresenta os ícones corretos', () => {
    renderWithRouter(<Footer />);

    const drinkIcon = screen.getByRole('img', { name: 'drinkIcon' });
    const exploreIcon = screen.getByRole('img', { name: 'explore' });
    const mealIcon = screen.getByRole('img', { name: 'meal' });

    expect(drinkIcon).toBeInTheDocument();
    expect(exploreIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
});

// Req 21
describe('Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  it('Não tem footer na tela de login', () => {
    const { queryByTestId } = renderWithRouter(<Login />);

    expect(queryByTestId('footer')).toBe(null);
  });

  it('Tem footer na tela de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de principal de receitas de bebidas', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Não tem footer na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/:id');

    const footer = screen.queryByTestId('footer');

    expect(footer).toBe(null);
  });

  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/:id');

    const footer = screen.queryByTestId('footer');

    expect(footer).toBe(null);
  });

  it('Não tem footer na tela de receita em progresso de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/:id/in-progress');

    const footer = screen.queryByTestId('footer');

    expect(footer).toBe(null);
  });

  it('Não tem footer na tela de receita em progresso de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/:id/in-progress');

    const footer = screen.queryByTestId('footer');

    expect(footer).toBe(null);
  });

  it('Tem footer na tela de explorar', () => {
    renderWithRouter(<Explore />);

    const footer = screen.queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas', () => {
    renderWithRouter(<ExploreFoods />);

    const footer = screen.queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar bebidas', () => {
    renderWithRouter(<ExploreDrinks />);

    const footer = screen.queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de comida por ingrediente', () => {
    renderWithRouter(<FoodsIngredients />);

    const footer = screen.queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de bebida por ingrediente', () => {
    renderWithRouter(<DrinksIngredients />);

    const footer = screen.queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar por nacionalidade', () => {
    renderWithRouter(<Nationalities />);

    const footer = screen.queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  // it('Tem footer na tela de perfil', () => {
  //   renderWithRouter(<Profile />);

  //   const footer = screen.queryByTestId('footer');

  //   expect(footer).toBeInTheDocument();
  // });

  it('Não tem footer na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const footer = screen.queryByTestId('footer');

    expect(footer).toBe(null);
  });

  it('Não tem footer na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const footer = screen.queryByTestId('footer');

    expect(footer).toBe(null);
  });
});

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/SearchBar.css';
import { Redirect, useLocation } from 'react-router-dom';
import drinksApi from '../services/drinksApi';
import mealsApi from '../services/mealsApi';

const state = {};
let location = '/';

function onChangeSearchText(event) {
  state.setSearchText(event.target.value);
}

function onChangeOption(event) {
  state.setOption(event.target.value);
}

function getRequest(event) {
  event.preventDefault();

  if (state.option === 'firstLetter' && state.searchText.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    state.setIsLoadingApiData(true);
    if (location.pathname === '/foods') {
      mealsApi(state.option, state.searchText)
        .then(({ meals }) => {
          state.setMeals(meals || []);
          state.setIsLoadingApiData(false);
        });
    } else {
      drinksApi(state.option, state.searchText)
        .then(({ drinks }) => {
          state.setDrinks(drinks || []);
          state.setIsLoadingApiData(false);
        });
    }
  }
}

function render() {
  return (
    <div>
      {
        !state.isLoadingApiData && (state.meals.length + state.drinks.length) === 1
          ? (
            <div>
              {
                state.meals.length > 0
                  ? <Redirect to={ `/foods/${state.meals[0].idMeal}` } />
                  : <Redirect to={ `/drinks/${state.drinks[0].idDrink}` } />
              }
            </div>
          )
          : (
            <form className="search-form">
              <div>
                <Form.Control
                  type="text"
                  value={ state.searchText }
                  onChange={ onChangeSearchText }
                  placeholder="Search Recipe"
                  data-testid="search-input"
                />
              </div>
              <div className="radio-btn">
                <label htmlFor="ingredient">
                  <input
                    id="ingredient"
                    type="radio"
                    name="filter"
                    value="ingredient"
                    onChange={ onChangeOption }
                    data-testid="ingredient-search-radio"
                  />
                  Ingredient
                </label>

                <label htmlFor="name">
                  <input
                    id="name"
                    type="radio"
                    name="filter"
                    value="name"
                    onChange={ onChangeOption }
                    data-testid="name-search-radio"
                  />
                  Name
                </label>
                <label htmlFor="firstLetter">
                  <input
                    id="firstLetter"
                    type="radio"
                    name="filter"
                    value="firstLetter"
                    onChange={ onChangeOption }
                    data-testid="first-letter-search-radio"
                  />
                  First Letter
                </label>
              </div>
              <div>
                <Button
                  type="submit"
                  onClick={ getRequest }
                  data-testid="exec-search-btn"
                  className="search-btn"
                  variant="outline-light"
                >
                  Search
                </Button>
              </div>
            </form>
          )
      }
    </div>
  );
}

function SearchBar() {
  [state.searchText, state.setSearchText] = useState('');
  [state.option, state.setOption] = useState('');
  [state.meals, state.setMeals] = useState([]);
  [state.drinks, state.setDrinks] = useState([]);
  [state.isLoadingApiData, state.setIsLoadingApiData] = useState(false);

  location = useLocation();

  return render();
}

export default SearchBar;
